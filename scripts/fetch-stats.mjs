// 从 GoatCounter 拉取访客统计，写到 src/data/stats.json，给“活点地图”页用。
//
// GitHub Actions 每天构建网站前会自动运行它（见 .github/workflows/deploy.yml）。
// 需要两个设置（在 GitHub 仓库 → Settings → Secrets and variables → Actions 里加）：
//   Variables 里的 GOATCOUNTER_CODE   站点代码，就是 xxx.goatcounter.com 里的 xxx
//   Secrets   里的 GOATCOUNTER_TOKEN  API 密钥（GoatCounter → Settings → API 里生成，只勾“读取统计”）
// 缺任何一个，脚本什么也不做，网站继续用原来的数据（示例数据）。
//
// 本地手动试：GOATCOUNTER_CODE=xxx GOATCOUNTER_TOKEN=yyy node scripts/fetch-stats.mjs

import fs from 'node:fs';

const CODE = process.env.GOATCOUNTER_CODE?.trim();
const TOKEN = process.env.GOATCOUNTER_TOKEN?.trim();
const OUT = new URL('../src/data/stats.json', import.meta.url);
const DAYS = 90;

if (!CODE || !TOKEN) {
  console.log('[stats] 没有设置 GOATCOUNTER_CODE / GOATCOUNTER_TOKEN，跳过，继续用现有数据。');
  process.exit(0);
}

const API = `https://${CODE}.goatcounter.com/api/v0`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const isoDay = (d) => d.toISOString().slice(0, 10);

async function get(path, params) {
  const url = `${API}${path}?${new URLSearchParams(params)}`;
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
    if (res.status === 429 && attempt < 4) {
      await sleep(1500 * attempt); // 限速了，等一下再试
      continue;
    }
    if (!res.ok) throw new Error(`${path} → HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    await sleep(300); // GoatCounter 限制每秒 4 次
    return res.json();
  }
}

const today = new Date();
const start = new Date(today);
start.setUTCDate(start.getUTCDate() - (DAYS - 1));
const range = { start: `${isoDay(start)}T00:00:00Z`, end: `${isoDay(today)}T23:59:59Z` };

try {
  const total = await get('/stats/total', range);
  const locations = await get('/stats/locations', { ...range, limit: 100 });
  const refs = await get('/stats/toprefs', { ...range, limit: 10 });
  const hits = await get('/stats/hits', { ...range, limit: 10 });

  // 补齐没有访问的日子，画曲线时不会断
  const byDay = new Map((total.stats ?? []).map((s) => [s.day, s.daily ?? 0]));
  const daily = [];
  for (let d = new Date(start); d <= today; d.setUTCDate(d.getUTCDate() + 1)) {
    daily.push({ day: isoDay(d), count: byDay.get(isoDay(d)) ?? 0 });
  }

  const stats = {
    sample: false,
    updated: isoDay(today),
    range: { start: isoDay(start), end: isoDay(today), days: DAYS },
    total: total.total ?? daily.reduce((a, b) => a + b.count, 0),
    daily,
    countries: (locations.stats ?? [])
      .filter((s) => /^[A-Z]{2}$/.test(s.id ?? ''))
      .map((s) => ({ code: s.id, name: s.name, count: s.count })),
    referrers: (refs.stats ?? []).map((s) => ({ name: s.name || '直接访问', count: s.count })),
    pages: (hits.hits ?? []).filter((h) => !h.event).map((h) => ({ path: h.path, title: h.title || h.path, count: h.count })),
  };

  fs.writeFileSync(OUT, JSON.stringify(stats, null, 2) + '\n');
  console.log(`[stats] 已更新：近 ${DAYS} 天 ${stats.total} 位访客，来自 ${stats.countries.length} 个国家和地区。`);
} catch (err) {
  // 拉取失败不要让整个网站构建失败，保留旧数据就好
  console.warn('[stats] 拉取失败，保留现有数据：', err.message);
}
