// 代码栏目（有求必应屋）里的项目。最新的写在最上面。
//
// 加一个新项目：
//   1. 把源码文件放到 public/code/<slug>/ 里（slug 是英文短名，会出现在网址里）
//   2. 在下面照着格式加一项，files 里写文件名
//   网站会自动显示源码、带“复制”和“下载”按钮。
//
// potion / effect / warning 是魔药标签上的小字，可以不写。

export interface Project {
  slug: string;
  name: string;
  nameZh?: string;
  summary: string; // 一句话介绍（卡片上显示）
  description?: string; // 详细介绍（项目页显示，支持简单 HTML）
  lang: string;
  date: string; // 写成 2026-09 这样
  files: string[];
  github?: string;
  tags?: string[];
  potion?: string; // 魔药名
  effect?: string; // 功效
  warning?: string; // 注意事项
  example?: boolean; // 示例项目，换成你自己的以后删掉这一行
}

export const PROJECTS: Project[] = [
  {
    slug: 'pensieve',
    name: 'pensieve',
    nameZh: '冥想盆',
    summary: '在终端里随手记一条想法，自动加上时间，存进一个文本文件。',
    description:
      '每天收工前花两分钟，写下今天做了什么、卡在哪里、明天第一件事做什么。<code>pensieve</code> 就是为这个写的：一行命令记一条，也能按天查看、全文搜索。只用系统自带的命令，macOS 和 Linux 都能用。',
    lang: 'Bash',
    date: '2026-09',
    files: ['pensieve.sh'],
    tags: ['CLI', '笔记'],
    potion: 'Draught of Recollection',
    effect: '把想法从脑子里抽出来，存好，随时再看。',
    warning: '请勿记录他人的记忆。',
    example: true,
  },
  {
    slug: 'bibtidy',
    name: 'bibtidy',
    nameZh: '文献整理剂',
    summary: '整理 BibTeX 文件：去掉重复条目、按年份排序、统一格式。',
    description:
      '投稿前最头疼的是参考文献：同一篇论文被导入了好几次，大小写不统一，字段顺序乱七八糟。<code>bibtidy</code> 按标题识别重复条目（保留字段更全的那条），按年份和 key 排序，统一缩进和字段顺序。只用 Python 标准库，下载即用。',
    lang: 'Python',
    date: '2026-08',
    files: ['bibtidy.py'],
    tags: ['BibTeX', '写论文'],
    potion: 'Tidying Tincture',
    effect: '让参考文献各归其位。',
    warning: '请置于 Reviewer 2 接触不到的地方。',
    example: true,
  },
];

// 文件扩展名 → 代码高亮用的语言
export const LANG_BY_EXT: Record<string, string> = {
  py: 'python', sh: 'bash', bash: 'bash', zsh: 'bash', js: 'javascript', mjs: 'javascript',
  ts: 'typescript', r: 'r', R: 'r', jl: 'julia', m: 'matlab', cpp: 'cpp', c: 'c', h: 'c',
  rs: 'rust', go: 'go', java: 'java', tex: 'latex', md: 'markdown', json: 'json',
  yml: 'yaml', yaml: 'yaml', toml: 'toml', html: 'html', css: 'css', sql: 'sql',
};
