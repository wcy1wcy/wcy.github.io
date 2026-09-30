// 中文按每分钟 400 字，英文按每分钟 220 词估算
export function readingMinutes(text = ''): number {
  const cjk = (text.match(/[㐀-鿿豈-﫿]/g) || []).length;
  const words = text.replace(/[㐀-鿿豈-﫿]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(cjk / 400 + words / 220));
}
