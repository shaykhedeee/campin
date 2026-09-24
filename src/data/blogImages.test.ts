import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { blogPosts } from './blogPosts';

describe('published blog imagery',()=>{
 it('uses existing, local, topic-specific hero images',()=>{
  expect(blogPosts.length).toBeGreaterThan(0);
  for(const post of blogPosts){
   expect(post.heroImage,post.slug).toMatch(/^\/images\/blog_[a-z0-9_-]+\.(jpg|webp)$/i);
   expect(existsSync(`public${post.heroImage}`),`${post.slug} hero image`).toBe(true);
  }
 });
});
