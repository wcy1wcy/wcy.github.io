// ────────────────────────────────────────────────────────────
//  网站的基本信息都在这里改。标了 TODO 的地方换成你自己的。
// ────────────────────────────────────────────────────────────

export const SITE = {
  // 名字
  name: 'CY Wang', // 英文名
  nameZh: '王某某', // TODO 中文名
  title: 'CY Wang', // 浏览器标签页上显示的名字

  // 一句话介绍（首页大标题下面）
  tagline: 'Researcher. Curious about how things work — and occasionally why they don’t.', // TODO
  description: 'Personal website of CY Wang — research, life, and the occasional howler.',

  // 首页自我介绍（可以写几段，支持简单 HTML）
  intro: [
    'I am a researcher working on <em>[your field]</em>. My work focuses on <em>[topic A]</em> and <em>[topic B]</em>.', // TODO
    '这里是我的个人小站：放论文，记生活，偶尔发发牢骚。',
  ],

  // 研究方向标签
  interests: ['Topic A', 'Topic B', 'Topic C'], // TODO

  // 论文作者列表里，你的名字会被加粗。写上你在论文里署名的各种写法
  authorNames: ['CY Wang', 'C. Y. Wang', 'C.Y. Wang', 'Wang, CY', 'Wang, C. Y.'],

  // 所属机构
  affiliation: 'Your Institution', // TODO

  // 链接（不需要的留空字符串就不显示）
  links: {
    email: 'you@example.com', // TODO
    scholar: '', // Google Scholar 主页链接
    orcid: '', // ORCID 链接
    github: 'https://github.com/wwbosell',
    twitter: '',
  },

  // 头像（会动的肖像）：照片放到 public/images/avatar.jpg，再把这里改成 '/images/avatar.jpg'
  avatar: '',

  // CV 的 PDF：放到 public/cv.pdf 后，把这里改成 '/cv.pdf'
  cv: '',

  // 页脚那句话，换成你自己喜欢的
  footerQuote: 'Ambition, with a little cunning, and a lot of curiosity.',

  // 分院年份（About 页的小彩蛋）
  sortedYear: '2001',

  // 首页报纸的报名，和创刊日期（期号 = 从这天起的第几天）
  paperName: 'The Evening Quill',
  paperNameZh: '夜羽报',
  founded: '2026-09-30',

  // GoatCounter 站点代码：注册后，xxx.goatcounter.com 里的 xxx 填在这里。
  // 留空 = 不统计，活点地图页显示示例数据。
  goatcounter: '',

  // 还没准备好公开之前，保持 true：告诉搜索引擎不要收录
  hideFromSearch: false,
};

// 导航：label 是正经名字，alias 是鼠标悬停时显示的魔法世界别名
export const NAV = [
  { href: '/', label: 'Home', zh: '首页', alias: 'Platform 9¾' },
  { href: '/blog/', label: 'Blog', zh: '博客', alias: 'The Gazette' },
  { href: '/code/', label: 'Code', zh: '代码', alias: 'Room of Requirement' },
  { href: '/research/', label: 'Research', zh: '研究', alias: 'Restricted Section' },
  { href: '/life/', label: 'Life', zh: '日常', alias: 'Pensieve & Howlers' },
  { href: '/map/', label: 'Map', zh: '访客', alias: 'Marauder’s Map' },
  { href: '/about/', label: 'About', zh: '关于', alias: 'The Sorting Hat' },
];
