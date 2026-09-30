// 一个够用的小 BibTeX 解析器：从 Google Scholar 导出的 .bib 直接贴进 src/data/publications.bib 就行。
// 额外支持的字段（可选）：selected = {true}（显示在首页）、pdf、code、url、slides、note（如 "Oral"、"Best Paper"）

export interface Pub {
  type: string;
  key: string;
  fields: Record<string, string>;
  raw: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  selected: boolean;
}

function readValue(src: string, i: number): [string, number] {
  while (/\s/.test(src[i])) i++;
  let out = '';
  if (src[i] === '{') {
    let depth = 0;
    for (; i < src.length; i++) {
      const c = src[i];
      if (c === '{') { if (depth++ === 0) continue; }
      else if (c === '}') { if (--depth === 0) { i++; break; } }
      out += c;
    }
  } else if (src[i] === '"') {
    i++;
    let depth = 0;
    for (; i < src.length; i++) {
      const c = src[i];
      if (c === '{') depth++;
      if (c === '}') depth--;
      if (c === '"' && depth === 0) { i++; break; }
      out += c;
    }
  } else {
    const m = /^[^,}\s]+/.exec(src.slice(i));
    out = m ? m[0] : '';
    i += out.length;
  }
  return [out, i];
}

export function cleanTex(s = ''): string {
  return s
    .replace(/\\&/g, '&')
    .replace(/\\%/g, '%')
    .replace(/\\\$/g, '$')
    .replace(/\\_/g, '_')
    .replace(/---/g, '—')
    .replace(/--/g, '–')
    .replace(/\\['`^"~]\{?(\w)\}?/g, '$1')
    .replace(/\\textit\{([^}]*)\}|\\emph\{([^}]*)\}/g, '$1$2')
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatAuthor(a: string): string {
  a = cleanTex(a);
  if (a.includes(',')) {
    const [last, first] = a.split(',').map((x) => x.trim());
    return `${first} ${last}`.trim();
  }
  return a;
}

export function parseBibtex(src: string): Pub[] {
  const pubs: Pub[] = [];
  const re = /@(\w+)\s*\{\s*([^,\s]+)\s*,/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const type = m[1].toLowerCase();
    if (['comment', 'string', 'preamble'].includes(type)) continue;
    const start = m.index;
    let i = re.lastIndex;
    const fields: Record<string, string> = {};
    while (i < src.length) {
      while (/[\s,]/.test(src[i])) i++;
      if (src[i] === '}') { i++; break; }
      const fm = /^([\w-]+)\s*=\s*/.exec(src.slice(i));
      if (!fm) break;
      i += fm[0].length;
      const [val, next] = readValue(src, i);
      fields[fm[1].toLowerCase()] = val;
      i = next;
    }
    re.lastIndex = i;
    const raw = src.slice(start, i).trim();
    // 导出 BibTeX 时去掉网站自用的字段
    const rawClean = raw
      .split('\n')
      .filter((l) => !/^\s*(selected|pdf|code|slides|note)\s*=/.test(l))
      .join('\n');
    pubs.push({
      type,
      key: m[2],
      fields,
      raw: rawClean,
      title: cleanTex(fields.title),
      authors: (fields.author || '').split(/\s+and\s+/).filter(Boolean).map(formatAuthor),
      venue: cleanTex(fields.journal || fields.booktitle || fields.publisher || fields.school || fields.howpublished || ''),
      year: parseInt(fields.year || '0', 10),
      selected: /^(true|yes|1)$/i.test(fields.selected || ''),
    });
  }
  return pubs.sort((a, b) => b.year - a.year);
}
