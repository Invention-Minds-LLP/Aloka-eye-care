import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFile } from 'node:fs/promises';

// Every page is prerendered at build time, so search engines get the full HTML
// and cPanel serves plain files (no Node server needed).
export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    // one page per post in public/blog-data/index.json (written by scripts/build-blog.mjs)
    async getPrerenderParams() {
      const posts: { slug: string }[] = JSON.parse(await readFile('public/blog-data/index.json', 'utf8'));
      return posts.map((p) => ({ slug: p.slug }));
    },
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
