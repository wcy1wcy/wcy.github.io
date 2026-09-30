---
title: 站台九又四分之三：新站开张
date: 2026-09-30
description: 这个网站的第一篇文章，顺便也是一份“怎么写文章”的说明书。
location: Home
tags: [meta, 建站]
---

欢迎来到这里。这是一个很小的角落：放一点研究，记一点生活，偶尔发几封吼叫信。

## 怎么写一篇新文章

在 `src/content/life/` 里新建一个 `.md` 文件，开头写上这几行：

```yaml
---
title: 文章标题
date: 2026-10-01
description: 一句话简介（可不写）
location: 在哪儿写的（可不写）
cover: /images/xxx.jpg   # 封面图（可不写，图片放 public/images/）
tags: [标签一, 标签二]
---
```

下面就是正文，用 Markdown 写。**加粗**、*斜体*、[链接](https://github.com/wcy1wcy)、列表、引用都可以：

> 引用会显示成这样——一段安静的斜体。

---

分隔线 `---` 会变成一条小蛇。

想发牢骚的话，也放在这个文件夹里，开头多写一行 `volume: 1~3`（音量），它就会变成一封吼叫信。正式的长文章放到 `src/content/blog/`，会登上首页头条。

写完保存，网站就会更新。
