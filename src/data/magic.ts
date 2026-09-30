// 网站里的魔咒、幽灵、神奇生物和地方。英文用原版名称，中文用人民文学出版社译名。
// 咒语书页面（/spells/）和施咒效果都从这里读。

export interface Spell {
  key: string; // 打字时匹配用：去掉空格、全小写
  words: string; // 咒语原文
  zh: string; // 中文译名
  kind: string; // 咒语类型
  effect: string; // 在这个网站上会发生什么
}

export const SPELLS: Spell[] = [
  { key: 'lumos', words: 'Lumos', zh: '荧光闪烁', kind: 'Wand-Lighting Charm · 荧光咒', effect: '点亮魔杖，切换到亮色模式。' },
  { key: 'nox', words: 'Nox', zh: '诺克斯', kind: 'Wand-Extinguishing Charm · 熄灭咒', effect: '熄灭光亮，走进黑湖底下的斯莱特林公共休息室（深色模式）。' },
  { key: 'accio', words: 'Accio', zh: '飞来', kind: 'Summoning Charm · 召唤咒', effect: '随机召唤一篇文章或一个小工具，飞到你面前。' },
  { key: 'wingardiumleviosa', words: 'Wingardium Leviosa', zh: '羽加迪姆 勒维奥萨', kind: 'Levitation Charm · 悬浮咒', effect: '让页面上的标题飘起来一会儿。注意发音：是 Levi-O-sa。' },
  { key: 'aparecium', words: 'Aparecium', zh: '急急现形', kind: 'Revealing Charm · 显形咒', effect: '让用隐形墨水写的字显出来。页面上藏着几行。' },
  { key: 'homenumrevelio', words: 'Homenum Revelio', zh: '人形显身', kind: 'Human-presence-revealing Spell', effect: '找出藏在这座城堡里的人……以及不太算人的东西。' },
  { key: 'expectopatronum', words: 'Expecto Patronum', zh: '呼神护卫', kind: 'Patronus Charm · 守护神咒', effect: '召唤一只银白色的守护神，从页面上跑过去。' },
  { key: 'scourgify', words: 'Scourgify', zh: '清理一新', kind: 'Scouring Charm · 清洁咒', effect: '擦掉羊皮纸上的污渍。再念一次就恢复。' },
  { key: 'riddikulus', words: 'Riddikulus', zh: '滑稽滑稽', kind: 'Boggart-Banishing Spell · 驱逐博格特', effect: '把吓人的东西变得滑稽——比如所有标题。' },
  { key: 'expelliarmus', words: 'Expelliarmus', zh: '除你武器', kind: 'Disarming Charm · 缴械咒', effect: '右上角的魔杖会被打飞，过一会儿自己飞回来。' },
  { key: 'alohomora', words: 'Alohomora', zh: '阿拉霍洞开', kind: 'Unlocking Charm · 开锁咒', effect: '打开页面上所有折叠起来的内容。' },
  { key: 'reparo', words: 'Reparo', zh: '恢复如初', kind: 'Mending Charm · 修复咒', effect: '修好坏掉的东西。比如办公室那台咖啡机（大概）。' },
  { key: 'obliviate', words: 'Obliviate', zh: '一忘皆空', kind: 'Memory Charm · 遗忘咒', effect: '忘掉你选过的亮色/深色，改回跟随系统。' },
  { key: 'finiteincantatem', words: 'Finite Incantatem', zh: '咒立停', kind: 'General Counter-Spell · 通用反咒', effect: '让所有正在生效的咒语停下来。' },
];

// 活点地图的两句口令，也能在任何页面直接打出来
export const PASSWORDS = [
  { key: 'isolemnlyswearthatiamuptonogood', words: 'I solemnly swear that I am up to no good', zh: '我庄严宣誓我不干好事', effect: '打开活点地图。' },
  { key: 'mischiefmanaged', words: 'Mischief managed', zh: '恶作剧完毕', effect: '把活点地图收起来。' },
];

export interface Ghost { key: string; name: string; zh: string; house: string; line: string }

export const GHOSTS: Ghost[] = [
  { key: 'baron', name: 'The Bloody Baron', zh: '血人巴罗', house: 'Slytherin · 斯莱特林', line: '斯莱特林的幽灵，夜里在地窖走廊巡视。没人敢问他身上的银色污渍是怎么来的。' },
  { key: 'nick', name: 'Nearly Headless Nick', zh: '差点没头的尼克', house: 'Gryffindor · 格兰芬多', line: '只差一点点——真的只差一点点——他就能加入无头猎手队了。' },
  { key: 'friar', name: 'The Fat Friar', zh: '胖修士', house: 'Hufflepuff · 赫奇帕奇', line: '他原谅所有人，包括写了“详见附录”却没有附录的作者。' },
  { key: 'lady', name: 'The Grey Lady', zh: '格雷女士', house: 'Ravenclaw · 拉文克劳', line: '她知道很多秘密，但只告诉礼貌提问的人。' },
  { key: 'myrtle', name: 'Moaning Myrtle', zh: '哭泣的桃金娘', house: '二楼女生盥洗室', line: '心情不好的时候，她会顺着水管在城堡里到处跑。' },
  { key: 'peeves', name: 'Peeves', zh: '皮皮鬼', house: 'Poltergeist · 恶作剧精灵', line: '他不是幽灵，是恶作剧精灵。找不到的页面多半是他藏起来的。' },
];

export interface Creature { key: string; name: string; zh: string; where: string; note: string; href?: string }

export const CREATURES: Creature[] = [
  { key: 'squid', name: 'The Giant Squid', zh: '大乌贼', where: '黑湖', note: '切换到深色模式，偶尔能看见它从公共休息室的窗外慢慢游过。' },
  { key: 'acromantula', name: 'Acromantula', zh: '八眼巨蛛', where: '禁林', note: '每一页最底下的树林里，有八只眼睛会眨。请走大路。' },
  { key: 'niffler', name: 'Niffler', zh: '嗅嗅', where: '有求必应屋', note: '喜欢一切亮闪闪的东西。在代码页上盯紧你的金加隆。', href: '/code/' },
  { key: 'owl', name: 'Owl', zh: '猫头鹰', where: '近况 · 关于', note: '负责送信。它们比电子邮件慢，但更可爱。', href: '/about/' },
  { key: 'basilisk', name: 'Basilisk', zh: '蛇怪', where: '每一条分隔线', note: '很小的一只，不用害怕。鼠标移上去，它会吐信子。' },
  { key: 'thestral', name: 'Thestral', zh: '夜骐', where: '？', note: '只有见过死亡的人才看得见它。如果你在这张卡片上什么也没看见——这是好事。' },
];

export const PLACES = [
  { name: 'Platform Nine and Three-Quarters', zh: '九又四分之三站台', what: '首页', href: '/' },
  { name: 'The Restricted Section', zh: '禁书区', what: '论文', href: '/research/' },
  { name: 'The Room of Requirement', zh: '有求必应屋', what: '代码', href: '/code/' },
  { name: 'The Pensieve', zh: '冥想盆', what: '日常', href: '/life/' },
  { name: 'The Marauder’s Map', zh: '活点地图', what: '访客', href: '/map/' },
  { name: 'The Slytherin Common Room', zh: '斯莱特林公共休息室', what: '深色模式（念 Nox）', href: '' },
  { name: 'The Black Lake', zh: '黑湖', what: '公共休息室的窗外', href: '' },
  { name: 'The Forbidden Forest', zh: '禁林', what: '每一页的最底下', href: '' },
];

// ── 首页小游戏：在网站里找齐咒语和神奇生物 ──
// 每一项都藏在“说得通”的地方。where = 找到后显示的位置，hint = 没找到时的线索。
export interface HuntItem { id: string; type: 'spell' | 'creature'; key: string; where: string; hint: string }

export const HUNT: HuntItem[] = [
  { id: 'spell:lumos', type: 'spell', key: 'lumos', where: '右上角的魔杖', hint: '你的魔杖就在右上角。让它亮起来。' },
  { id: 'spell:nox', type: 'spell', key: 'nox', where: '右上角的魔杖', hint: '把魔杖的光熄灭试试。' },
  { id: 'spell:wingardiumleviosa', type: 'spell', key: 'wingardiumleviosa', where: '首页报名里的羽毛笔', hint: '首页的报名叫 The Evening Quill——Quill 就是羽毛笔。一年级第一节魔咒课，大家都在让羽毛飘起来。' },
  { id: 'spell:accio', type: 'spell', key: 'accio', where: '首页的分类广告', hint: '首页的分类广告里，有人丢了东西。' },
  { id: 'spell:aparecium', type: 'spell', key: 'aparecium', where: '博客页的墨水瓶', hint: '报社里最不缺的就是墨水。去博客页找找那瓶墨水。' },
  { id: 'spell:scourgify', type: 'spell', key: 'scourgify', where: '有求必应屋角落的蜘蛛网', hint: '有求必应屋很久没人打扫了，角落里结了网。' },
  { id: 'spell:alohomora', type: 'spell', key: 'alohomora', where: '禁书区门上的锁', hint: '禁书区的门上挂着一把锁。' },
  { id: 'spell:expectopatronum', type: 'spell', key: 'expectopatronum', where: '冥想盆', hint: '守护神需要最快乐的记忆，而记忆都存放在冥想盆里。' },
  { id: 'spell:riddikulus', type: 'spell', key: 'riddikulus', where: '日常页的吼叫信', hint: '日常页上最吓人的东西是什么？把它变滑稽。' },
  { id: 'spell:homenumrevelio', type: 'spell', key: 'homenumrevelio', where: '活点地图上的脚印', hint: '活点地图上走来走去的脚印，到底是谁的？' },
  { id: 'spell:isolemnlyswearthatiamuptonogood', type: 'spell', key: 'isolemnlyswearthatiamuptonogood', where: '活点地图', hint: '打开活点地图需要一句口令。' },
  { id: 'spell:mischiefmanaged', type: 'spell', key: 'mischiefmanaged', where: '活点地图', hint: '用完活点地图，别忘了把它收起来。' },
  { id: 'spell:expelliarmus', type: 'spell', key: 'expelliarmus', where: '关于页的两根魔杖', hint: '关于页的经历里有一场博士答辩。答辩和决斗，其实差不多。' },
  { id: 'spell:obliviate', type: 'spell', key: 'obliviate', where: '不存在的页面', hint: '去一个不存在的页面看看。它为什么不存在？' },
  { id: 'spell:reparo', type: 'spell', key: 'reparo', where: '不存在的页面里断掉的链接', hint: '那个不存在的页面里，有样东西断了。' },
  { id: 'spell:finiteincantatem', type: 'spell', key: 'finiteincantatem', where: '咒语书的最后一页', hint: '每本书都有最后一页。' },
  { id: 'creature:owl', type: 'creature', key: 'owl', where: '首页的猫头鹰邮报', hint: '猫头鹰邮报，总得有一只猫头鹰来送。' },
  { id: 'creature:niffler', type: 'creature', key: 'niffler', where: '有求必应屋', hint: '有求必应屋里，有个小家伙正盯着亮闪闪的东西。' },
  { id: 'creature:basilisk', type: 'creature', key: 'basilisk', where: '文章末尾的小蛇', hint: '每篇文章结尾那条小蛇，也许不只是装饰。' },
  { id: 'creature:acromantula', type: 'creature', key: 'acromantula', where: '禁林深处', hint: '每一页的最底下是禁林。树林里有眼睛在眨。' },
  { id: 'creature:thestral', type: 'creature', key: 'thestral', where: '禁林里的空地', hint: '禁林里有一小块空地，那里好像站着什么看不见的东西。' },
  { id: 'creature:squid', type: 'creature', key: 'squid', where: '公共休息室的窗外', hint: '念 Nox，走进公共休息室，看看页脚那扇望向黑湖的窗。' },
];

// O.W.L. 成绩（普通巫师等级考试）：找到的数量 ≥ min 就是这一档
export const GRADES = [
  { min: 0, en: 'Troll', zh: '巨怪' },
  { min: 4, en: 'Dreadful', zh: '糟糕' },
  { min: 8, en: 'Poor', zh: '差' },
  { min: 12, en: 'Acceptable', zh: '及格' },
  { min: 16, en: 'Exceeds Expectations', zh: '良好' },
  { min: 22, en: 'Outstanding', zh: '优秀' },
];

export function huntName(item: HuntItem): { en: string; zh: string } {
  if (item.type === 'creature') {
    const c = CREATURES.find((x) => x.key === item.key)!;
    return { en: c.name, zh: c.zh };
  }
  const s = SPELLS.find((x) => x.key === item.key) ?? PASSWORDS.find((x) => x.key === item.key)!;
  return { en: s.words, zh: s.zh };
}

export const gradeFor = (n: number) => [...GRADES].reverse().find((g) => n >= g.min)!;
