import { getCollection } from 'astro:content';

export async function getPosts(name: 'blog' | 'life') {
  const all = await getCollection(name, ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// 首页头条：标了 featured 的最新一篇，否则就是最新一篇
export async function getHeadline() {
  const posts = await getPosts('blog');
  return posts.find((p) => p.data.featured) ?? posts[0];
}

// 取正文第一段纯文本，当首页头条的导语
export function firstParagraph(body = '', max = 260): string {
  const para = body
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .find((b) => b && !/^(#|>|```|-|\*|\||!\[|<)/.test(b)) ?? '';
  const text = para
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text;
}
