import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const base = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

// 博客：正式长文。最新的一篇（或者写了 featured: true 的那篇）会当首页头条
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: base.extend({
    cover: z.string().optional(), // 封面图，放在 public/images/ 下，写 /images/xxx.jpg
    kicker: z.string().optional(), // 标题上方的小栏目名，比如“随笔”“教程”
    featured: z.boolean().default(false),
  }),
});

// 日常 + 吼叫信：写了 volume 的就是吼叫信，1 = 小声嘀咕，3 = 吼叫信全开
const life = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/life' }),
  schema: base.extend({
    cover: z.string().optional(),
    location: z.string().optional(),
    volume: z.number().int().min(1).max(3).optional(),
  }),
});

export const collections = { blog, life };
