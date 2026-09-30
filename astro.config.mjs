// @ts-check
import { defineConfig } from 'astro/config';

// 上线前确认：site 就是你的 GitHub Pages 地址
export default defineConfig({
  site: 'https://wwbosell.github.io',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // 牢骚已经并进“日常”，旧网址自动跳过去
  redirects: { '/rants': '/life/#howlers' },
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark-dimmed' } },
  },
});
