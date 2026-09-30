import fs from 'node:fs';
import path from 'node:path';
import { LANG_BY_EXT, type Project } from '../data/code';

export interface CodeFile {
  name: string;
  href: string;
  lang: string;
  code: string;
  lines: number;
  bytes: number;
}

// 构建时从 public/code/<slug>/ 读出源码
export function readFiles(p: Project): CodeFile[] {
  return p.files.map((name) => {
    const file = path.resolve(process.cwd(), 'public/code', p.slug, name);
    if (!fs.existsSync(file)) {
      throw new Error(`[code] 找不到 public/code/${p.slug}/${name}，检查一下 src/data/code.ts 里的 files`);
    }
    const code = fs.readFileSync(file, 'utf-8');
    const ext = name.split('.').pop() ?? '';
    return {
      name,
      href: `/code/${p.slug}/${name}`,
      lang: LANG_BY_EXT[ext] ?? 'text',
      code,
      lines: code.trimEnd().split('\n').length,
      bytes: Buffer.byteLength(code),
    };
  });
}

export const fmtMonth = (ym: string) => {
  const [y, m] = ym.split('-').map(Number);
  return new Date(y, (m || 1) - 1, 1).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
};
