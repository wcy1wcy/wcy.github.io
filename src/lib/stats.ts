// 活点地图：在构建时把访客数据画成 SVG（网页里不需要加载任何地图库）
import { geoNaturalEarth1, geoPath, geoCentroid } from 'd3-geo';
import { feature } from 'topojson-client';
import countries from 'i18n-iso-countries';
import world from 'world-atlas/countries-110m.json';
import raw from '../data/stats.json';

export interface Stats {
  sample: boolean;
  updated: string;
  range: { start: string; end: string; days: number };
  total: number;
  daily: { day: string; count: number }[];
  countries: { code: string; name: string; count: number }[];
  referrers: { name: string; count: number }[];
  pages: { path: string; title: string; count: number }[];
}
export const STATS = raw as Stats;

export const MAP_W = 960;
export const MAP_H = 470;
export const LEVELS = 5;

// 110m 精度的地图里没有的小地方，用经纬度补上脚印的位置
const SMALL_PLACES: Record<string, [number, number]> = {
  SG: [103.82, 1.35], HK: [114.17, 22.32], MO: [113.54, 22.19], MT: [14.4, 35.9],
  LU: [6.13, 49.61], BH: [50.56, 26.07], MV: [73.5, 4.17], MU: [57.55, -20.25],
  AD: [1.52, 42.51], MC: [7.42, 43.74], LI: [9.55, 47.16], SM: [12.45, 43.94],
  XK: [20.9, 42.6], BB: [-59.55, 13.19], BN: [114.73, 4.54], QA: [51.18, 25.35],
};

let cached: ReturnType<typeof compute> | undefined;
export const buildMap = () => (cached ??= compute());

function compute() {
  const counts = new Map(STATS.countries.map((c) => [c.code, c]));
  const max = Math.max(1, ...STATS.countries.map((c) => c.count));

  // 按对数分 5 档，访客数量差距大的时候颜色也分得开
  const thresholds = Array.from({ length: LEVELS }, (_, i) => Math.max(1, Math.round(Math.exp((Math.log(max) * i) / LEVELS))));
  const levelOf = (n: number) => (n <= 0 ? 0 : thresholds.filter((t) => n >= t).length);

  const geo = feature(world as any, (world as any).objects.countries) as any;
  const shapes = geo.features.filter((f: any) => f.id !== '010'); // 去掉南极洲
  const projection = geoNaturalEarth1().fitExtent([[4, 4], [MAP_W - 4, MAP_H - 4]], { type: 'FeatureCollection', features: shapes } as any);
  const path = geoPath(projection).digits(1);

  const byNumeric = new Map<string, any>(shapes.map((f: any) => [f.id, f]));

  const land = shapes.map((f: any) => {
    const code = f.id ? countries.numericToAlpha2(f.id) : undefined;
    const hit = code ? counts.get(code) : undefined;
    return {
      d: path(f) ?? '',
      code: code ?? '',
      name: hit?.name ?? f.properties?.name ?? '',
      count: hit?.count ?? 0,
      level: levelOf(hit?.count ?? 0),
    };
  });

  // 脚印：访客最多的国家/地区，每处一串小脚印
  const footprints = STATS.countries
    .slice(0, 14)
    .map((c, i) => {
      const f = byNumeric.get(countries.alpha2ToNumeric(c.code) ?? '');
      const lonlat = SMALL_PLACES[c.code] ?? (f ? geoCentroid(f) : undefined);
      const xy = lonlat && projection(lonlat as [number, number]);
      if (!xy) return undefined;
      return {
        ...c,
        x: Math.round(xy[0]),
        y: Math.round(xy[1]),
        angle: ((i * 137) % 360) - 180, // 每串脚印朝不同的方向走
        delay: (i * 0.37) % 3,
        labelled: i < 6,
      };
    })
    .filter(Boolean) as (Stats['countries'][number] & { x: number; y: number; angle: number; delay: number; labelled: boolean; label?: { dx: number; dy: number; anchor: 'start' | 'end' } })[];

  // 给前几名放名字标签：依次试四个方向，避开已经放好的标签
  type Box = { x0: number; y0: number; x1: number; y1: number };
  const placed: Box[] = [];
  const overlaps = (a: Box) => placed.some((b) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0);
  const labels = footprints.map((f) => {
    if (!f.labelled) return undefined;
    const w = f.name.length * 7.2 + 4;
    const tries = [
      { dx: 12, dy: -12, anchor: 'start' }, { dx: 12, dy: 20, anchor: 'start' },
      { dx: -12, dy: -12, anchor: 'end' }, { dx: -12, dy: 20, anchor: 'end' },
      { dx: 12, dy: 38, anchor: 'start' }, { dx: -12, dy: -30, anchor: 'end' },
    ];
    for (const t of tries) {
      const x0 = t.anchor === 'start' ? f.x + t.dx : f.x + t.dx - w;
      const box = { x0, x1: x0 + w, y0: f.y + t.dy - 13, y1: f.y + t.dy + 3 };
      if (box.x0 < 4 || box.x1 > MAP_W - 4 || box.y0 < 2 || overlaps(box)) continue;
      placed.push(box);
      return { dx: t.dx, dy: t.dy, anchor: t.anchor as 'start' | 'end' };
    }
    return undefined; // 实在放不下就不放，悬停时仍有提示
  });
  footprints.forEach((f, i) => Object.assign(f, { label: labels[i] }));

  const legend = thresholds.map((t, i) => ({ level: i + 1, from: t, to: i + 1 < LEVELS ? thresholds[i + 1] - 1 : max }))
    .filter((l) => l.to >= l.from);

  return { land, footprints, legend };
}

// 总结用的几个数字
export function summary() {
  const d = STATS.daily;
  const sum = (a: { count: number }[]) => a.reduce((s, x) => s + x.count, 0);
  const last30 = sum(d.slice(-30));
  const prev30 = sum(d.slice(-60, -30));
  return {
    total: STATS.total,
    last30,
    change: prev30 ? Math.round(((last30 - prev30) / prev30) * 100) : null,
    places: STATS.countries.length,
    top: STATS.countries[0],
    topRef: STATS.referrers.find((r) => r.name !== '直接访问') ?? STATS.referrers[0],
  };
}

export const fmtNum = (n: number) => n.toLocaleString('en-US');
