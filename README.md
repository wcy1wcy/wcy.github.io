# wwbosell.github.io · 个人网站

Astro 搭的静态网站。斯莱特林配色，带“地窖模式”（深色）和一些小彩蛋。
网址：**https://wwbosell.github.io**（放在 GitHub Pages 上，免费；每次推送到 GitHub 会自动更新）

## 在自己电脑上预览

**方法一（推荐）**：打开“终端”，粘贴：

```bash
cd ~/Desktop/web
npm install        # 只有第一次需要
npm run dev
```

然后浏览器打开 http://localhost:4321 。改了任何文件，页面会自动刷新。按 `Ctrl + C` 停止。
（没有 Node.js 的话，先去 https://nodejs.org 装 LTS 版本。）

**方法二**：双击 `预览网站.command`。如果提示“没有权限”，在终端运行一次：
`chmod +x ~/Desktop/web/预览网站.command`，之后就能双击了。

## 栏目

| 栏目 | 别名 | 网址 | 内容放在哪 |
|---|---|---|---|
| 首页 | Platform 9¾ | `/` | 报纸版式，自动汇总下面各栏目的最新内容 |
| Blog 博客 | The Gazette | `/blog/` | `src/content/blog/*.md` |
| Code 代码 | 有求必应屋 | `/code/` | `src/data/code.ts` + `public/code/<项目名>/` |
| Research 研究 | 禁书区 | `/research/` | `src/data/publications.bib` |
| Life 日常 | 冥想盆 & 吼叫信 | `/life/` | `src/content/life/*.md` |
| Map 访客 | 活点地图 | `/map/` | 自动生成（见下面“访客统计”） |
| About 关于 | 分院帽 | `/about/` | `src/data/cv.ts` |

## 要改哪里

| 想改的东西 | 文件 |
|---|---|
| 名字、简介、链接、研究方向、页脚那句话 | `src/config.ts` |
| 首页报纸的报名（The Evening Quill）、创刊日期 | `src/config.ts` 里的 `paperName`、`founded` |
| 首页“近况”和“分类广告” | `src/data/news.ts` |
| About 页的中英文简介、经历 | `src/data/cv.ts` |
| 论文 | `src/data/publications.bib`（直接贴 Google Scholar 导出的 BibTeX） |
| 博客长文 | `src/content/blog/*.md`（最新的一篇自动当首页头条） |
| 日常文章 | `src/content/life/*.md` |
| 吼叫信（牢骚） | 也放在 `src/content/life/`，开头多写一行 `volume: 1~3` |
| 代码项目 | 源码放 `public/code/<项目名>/`，再到 `src/data/code.ts` 里加一项 |
| 头像（会动的肖像） | 放到 `public/images/avatar.jpg`，再把 `src/config.ts` 里的 `avatar` 改成 `'/images/avatar.jpg'` |
| CV | 放到 `public/cv.pdf`，再把 `src/config.ts` 里的 `cv` 改成 `'/cv.pdf'` |
| 图片 | 放到 `public/images/`，文章里写 `![说明](/images/xxx.jpg)` |
| 颜色、字体 | `src/styles/global.css` 最上面 |

写文章的格式，看 `src/content/life/hello-world.md` 这篇示例就行。
博客文章还可以多写几项：`kicker: 随笔`（标题上方的小栏目名）、`cover: /images/xxx.jpg`（封面图，在首页会“慢慢动”）、`featured: true`（指定它当头条）。
不想发布的草稿，在开头加 `draft: true`。

论文 BibTeX 里还可以加这些字段：`selected = {true}`（显示在首页）、`pdf`、`code`、`slides`、`url`、`note = {Oral}`（小徽章）。

**示例内容**：两篇博客（`writing-in-public.md`、`research-workflow.md`）和两个代码项目（pensieve、bibtidy）都是示例，换成你自己的以后删掉即可。代码项目在 `src/data/code.ts` 里删掉 `example: true` 那一行，就不会再显示“示例”小印章。

## 访客统计（活点地图）

GitHub Pages 只能放静态网页，所以统计交给 [GoatCounter](https://www.goatcounter.com)（个人非商业使用免费，不用 cookie）。
**在网站正式公开之前，活点地图显示的是示例数据**（`src/data/stats.json` 里 `"sample": true`）。

网站上线后这样接上：

1. 去 goatcounter.com 注册，站点代码（Code）随便起，比如 `wwbosell`，以后地址就是 `wwbosell.goatcounter.com`
2. 在 GoatCounter 的 Settings 里勾上 **“Allow adding visitor counts on your website”**（首页和活点地图的总访问量要用）
3. 把 `src/config.ts` 里的 `goatcounter` 改成你的站点代码，比如 `'wwbosell'`。这一步之后，网站开始计数
4. GoatCounter → Settings → API → 新建一个 API 密钥，只勾 **“Read statistics”**
5. GitHub 仓库 → Settings → Secrets and variables → Actions：
   - **Variables** 页：新建 `GOATCOUNTER_CODE`，值填站点代码
   - **Secrets** 页：新建 `GOATCOUNTER_TOKEN`，值填第 4 步的密钥（密钥只放这里，不要写进任何文件）
6. 之后 GitHub Actions 每天会自动拉一次数据、重新生成网站。想马上看效果：仓库 → Actions → Deploy to GitHub Pages → Run workflow

小提示：
- 地图、曲线、排行每天更新一次；总访问量是打开网页时实时读取的（GoatCounter 那边最多缓存 4 小时）
- GitHub 的定时任务在仓库 60 天没有任何提交后会自动暂停，到 Actions 页面点一下就能恢复
- 活点地图的网址后面加 `#reveal`（`/map/#reveal`），打开时直接展开地图，适合分享

## 首页小游戏：找咒语和神奇生物

首页报头下面的“号外”（仿《预言家日报》版式）介绍了玩法：网站里藏着 16 条咒语（含活点地图的两句口令）和 6 只神奇生物，访客点到就算找到，左下角的 ✦ 显示进度，点开是收集册；咒语书 `/spells/` 里没找到的只显示线索。按找到的数量给 O.W.L. 成绩，全部找齐会放出一只守护神。

- 每一项藏在哪里、线索怎么写，都在 `src/data/magic.ts` 的 `HUNT` 里
- 藏东西的位置都在网站固定的部分（报头、各栏目首页、404、页脚的禁林等），不在示例文章里，所以删改文章不会让游戏缺东西
- 在页面上藏一个新东西：`<Find id="..." icon="padlock" label="..." />`（图标见 `src/components/Find.astro`），或者给任意元素加 `data-find="..."`，再在 `HUNT` 里加一项
- 进度只存在访客自己的浏览器里（localStorage），收集册底部可以清空

## 彩蛋

**咒语**：在任何页面直接打字就能施咒（不分大小写，空格可有可无）。完整列表在 **咒语书** `/spells/`，那里每条咒语都有“施咒”按钮，手机上也能用。

| 咒语 | 中文 | 效果 |
|---|---|---|
| Lumos / Nox | 荧光闪烁 / 诺克斯 | 亮色 / 深色（深色 = 黑湖底下的斯莱特林公共休息室） |
| Accio | 飞来 | 随机召唤一篇文章或一个工具 |
| Wingardium Leviosa | 羽加迪姆 勒维奥萨 | 标题飘起来 |
| Aparecium | 急急现形 | 显出隐形墨水写的字（页脚、关于、活点地图、咒语书里各藏了一行） |
| Homenum Revelio | 人形显身 | 叫出一位城堡幽灵 |
| Expecto Patronum | 呼神护卫 | 银色守护神跑过页面 |
| Scourgify | 清理一新 | 擦掉羊皮纸纹理 |
| Riddikulus | 滑稽滑稽 | 所有标题变滑稽 |
| Expelliarmus | 除你武器 | 右上角的魔杖被打飞 |
| Alohomora | 阿拉霍洞开 | 打开所有折叠内容 |
| Reparo | 恢复如初 | 修好东西（在咖啡机那篇里试试） |
| Obliviate | 一忘皆空 | 忘掉主题偏好 |
| Finite Incantatem | 咒立停 | 停止所有咒语 |
| I solemnly swear that I am up to no good / Mischief managed | 我庄严宣誓我不干好事 / 恶作剧完毕 | 打开 / 收起活点地图 |

**住在城堡里的东西**（都在咒语书里有介绍）：
- 幽灵：血人巴罗、差点没头的尼克、胖修士、格雷女士、哭泣的桃金娘、皮皮鬼。在首页和栏目首页，偶尔会有一位飘过（每次打开网站最多一次），鼠标移上去看名字，点一下听它说话
- 大乌贼（黑湖）：深色模式下偶尔从窗外游过
- 八眼巨蛛（禁林）：每页底部的树林里，八只眼睛会眨
- 嗅嗅：代码页标题下面的分隔线后面，点它会偷你的金加隆
- 猫头鹰：首页“Owl Post”和关于页的邮箱旁边
- 蛇怪：每条小蛇分隔线，鼠标移上去会吐信子
- 夜骐：你看不见它

**其他**：
- 鼠标悬停导航栏，会浮现魔法世界别名；移到头像上，肖像会动一下
- 首页报头的期号 = 创刊以来第几天，“天气预报”每天换一句
- 音量 3 的吼叫信，标题会抖；404 页是皮皮鬼的地盘；浏览器控制台里也有一个

所有咒语、幽灵、生物的名字和说明都在 `src/data/magic.ts`，想改文字直接改那里。系统设置了“减少动态效果”的话，动画会自动关掉。

## 第一次上线（只需要做一次）

不用装任何客户端：GitHub 网页上建仓库，本地用系统自带的 git 推送。
这台电脑上已经配好了：推送用的 SSH 密钥在 `~/.ssh/github_wwbosell`（只给这个项目用），仓库地址 `git@github.com:wwbosell/wwbosell.github.io.git`。

1. **建仓库**：打开 https://github.com/new
   - Repository name 填 **`wwbosell.github.io`**（必须一字不差），选 **Public**
   - 下面的 README、.gitignore、license **都不要勾**（要一个空仓库）→ Create repository
2. **添加密钥**：打开 https://github.com/settings/ssh/new
   - Title 随便写，比如 `Mac - personal site`；Key type 选 Authentication Key
   - Key 一栏粘贴 `~/.ssh/github_wwbosell.pub` 的内容（终端里运行 `cat ~/.ssh/github_wwbosell.pub` 就能看到，以 `ssh-ed25519` 开头的一整行）→ Add SSH key
3. **打开 Pages**：仓库页 → **Settings → Pages** → Build and deployment 的 **Source 选 “GitHub Actions”**
4. **第一次推送**：双击 `发布更新.command`；或者在终端里：
   ```bash
   cd ~/Desktop/web
   git push -u origin main
   ```
5. 等一两分钟，仓库的 **Actions** 页出现绿色 ✓ 后，打开 **https://wwbosell.github.io**

> 仓库是公开的：任何人都能看到网站的源代码和文章原稿（草稿 `draft: true` 的文章也在里面，只是不显示在网站上）。不要把密码、密钥写进任何文件。

## 平时怎么更新

**在电脑上改（推荐）**

1. 用任意编辑器改文件（上面“要改哪里”有对照表），比如在 `src/content/blog/` 里新建一篇 `.md`
2. 想先看看效果：双击 `预览网站.command`，浏览器打开 http://localhost:4321（需要先装 [Node.js](https://nodejs.org) 的 LTS 版本，装一次就好）
3. 双击 **`发布更新.command`**：它会先同步网上的改动，列出你改了哪些文件，让你写一句说明，然后推送
4. 一两分钟后网站自动更新。进度看 https://github.com/wwbosell/wwbosell.github.io/actions ：绿色 ✓ 成功，红色 ✗ 失败（点进去能看到原因，通常是文章开头的格式写错了）

喜欢用终端的话，同样的事情是这四行：
```bash
cd ~/Desktop/web
git pull
git add -A
git commit -m "这次改了什么"
git push
```

**在 GitHub 网页上改（改个错字、手机上临时改）**

- 改已有文件：在仓库里找到文件 → 右上角铅笔图标 ✏️ → 改完点 **Commit changes**，网站会自动更新
- 写新文章：进到 `src/content/blog/`（或 `life/`）→ **Add file → Create new file** → 文件名 `xxx.md` → 照着别的文章开头的格式写 → Commit changes
- 网页上改过之后，回到电脑上改之前，先双击 **`同步网上的改动.command`**（或运行 `git pull`）。`发布更新.command` 也会先自动同步，所以忘了也问题不大

**让 Claude 帮你改**：改好后双击 `发布更新.command` 就行。

## 想用自己的域名（可选）

`wwbosell.github.io` 已经是一个任何人都能访问的网址。如果想要 `cywang.com` 这样的域名：

1. 在域名注册商（Cloudflare、Namecheap、阿里云等）买一个域名
2. 仓库 → Settings → Pages → **Custom domain** 填上域名，保存，勾选 Enforce HTTPS
3. 在域名注册商的 DNS 设置里，按 GitHub 页面上的提示添加记录（子域名如 `www` 用 CNAME 指向 `wwbosell.github.io`；根域名用 GitHub 给的几条 A 记录）
4. 把 `astro.config.mjs` 里的 `site` 改成新域名，提交推送
