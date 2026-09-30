/**
 * Builds the blog from content/blog/*.md (written in Decap CMS or by hand).
 * No server: everything becomes static JSON the Angular app reads, plus a sitemap.
 *
 *   content/blog/<slug>.md  ->  public/blog-data/index.json
 *                               public/blog-data/posts/<slug>.json
 *                               public/sitemap.xml
 *
 * Custom blocks (inserted from the CMS toolbar) are written as
 *   :::name arguments
 *   body
 *   :::
 * and rendered to designed HTML here, so the CMS stays simple and the site owns the look.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'content/blog');
const OUT = path.join(ROOT, 'public/blog-data');
const SITE = 'https://dralokaseyecare.com';
const BOOKING = 'https://appointmentpluginprod.azurewebsites.net/Appointment/0ZGZEJP2/1';
const WHATSAPP =
  'https://wa.me/917416427503?text=' + encodeURIComponent("Hello Dr. Aloka's Eye Care, I'd like to book an appointment for my child.");

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const marked = new Marked({ gfm: true });
marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      return `<h${depth} id="${slugify(text)}">${text}</h${depth}>\n`;
    },
    image({ href, title, text }) {
      return `<img src="${esc(href)}" alt="${esc(text)}"${title ? ` title="${esc(title)}"` : ''} loading="lazy" decoding="async" />`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href) && !href.startsWith(SITE);
      return `<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ''}${external ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
    },
  },
});
const md = (s) => marked.parse(s.trim());
const split = (s) => s.split('|').map((x) => x.trim());

/** The designed blocks. Keep in sync with public/admin/index.html (editor side). */
const BLOCKS = {
  tip: (arg, body) =>
    `<aside class="blk blk-tip"><p class="blk-tip__title">${esc(arg || 'Tip')}</p>${md(body)}</aside>`,

  cta: (arg, body) =>
    `<aside class="blk blk-cta"><p class="blk-cta__title">${esc(arg || 'Worried about your child’s eyes?')}</p>${
      body.trim() ? md(body) : '<p>Dr. Aloka Hedau sees children and adults Monday to Saturday, 10 am – 5 pm, in KPHB, Kukatpally.</p>'
    }<p class="blk-cta__actions"><a class="btn-book" href="${BOOKING}" target="_blank" rel="noopener">Book an appointment</a><a class="btn-wa" href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a></p></aside>`,

  quote: (arg, body) => `<blockquote class="blk blk-quote">${md(body)}${arg ? `<footer>${esc(arg)}</footer>` : ''}</blockquote>`,

  faq: (_arg, body) => {
    const items = [];
    let cur = null;
    for (const line of body.split('\n')) {
      const q = line.match(/^Q:\s*(.+)$/i);
      const a = line.match(/^A:\s*(.+)$/i);
      if (q) items.push((cur = { q: q[1], a: '' }));
      else if (a && cur) cur.a += a[1] + '\n';
      else if (cur && line.trim()) cur.a += line + '\n';
    }
    return `<div class="blk blk-faq">${items
      .map((i) => `<details><summary>${esc(i.q)}</summary>${md(i.a)}</details>`)
      .join('')}</div>`;
  },

  figure: (arg) => {
    const [src, caption = ''] = split(arg);
    return `<figure class="blk blk-figure"><img src="${esc(src)}" alt="${esc(caption)}" loading="lazy" decoding="async" />${
      caption ? `<figcaption>${esc(caption)}</figcaption>` : ''
    }</figure>`;
  },

  /** Image on one side, text on the other, in one box:  :::split left /images/x.webp | description */
  split: (arg, body) => {
    const m = arg.match(/^(left|right)\s+(.*)$/i);
    const side = (m?.[1] ?? 'left').toLowerCase();
    const [src = '', alt = ''] = split(m ? m[2] : arg);
    return `<section class="blk blk-split blk-split--${side}"><div class="blk-split__media"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" /></div><div class="blk-split__text">${md(body)}</div></section>`;
  },

  compare: (arg) => {
    const [before, after, caption = ''] = split(arg);
    return `<figure class="blk blk-compare" style="--reveal:50%"><div class="blk-compare__frame"><img src="${esc(before)}" alt="Before" loading="lazy" /><img class="blk-compare__after" src="${esc(after)}" alt="After" loading="lazy" /><span class="blk-compare__edge"></span><span class="blk-compare__tag">Before</span><span class="blk-compare__tag blk-compare__tag--after">After</span></div><input class="blk-compare__range" type="range" min="0" max="100" value="50" aria-label="Slide to compare before and after" />${
      caption ? `<figcaption>${esc(caption)}</figcaption>` : ''
    }</figure>`;
  },
};

function renderBody(src) {
  // Blocks first (they may contain markdown), then the rest.
  const html = src.replace(/^:::(\w+)[ \t]*(.*)\n([\s\S]*?)^:::[ \t]*$/gm, (all, name, arg, body) => {
    const fn = BLOCKS[name];
    return fn ? `\n\n<!--blk-->${fn(arg.trim(), body)}<!--/blk-->\n\n` : all;
  });
  // Protect rendered blocks from markdown, then restore.
  const saved = [];
  const guarded = html.replace(/<!--blk-->([\s\S]*?)<!--\/blk-->/g, (_, h) => `\n\n@@BLK${saved.push(h) - 1}@@\n\n`);
  return md(guarded).replace(/<p>@@BLK(\d+)@@<\/p>|@@BLK(\d+)@@/g, (_, a, b) => saved[a ?? b]);
}

const words = (s) => s.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const iso = (d) => (d instanceof Date ? d.toISOString() : new Date(d).toISOString());

function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(path.join(OUT, 'posts'), { recursive: true });

  const posts = fs
    .readdirSync(SRC)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(SRC, f), 'utf8'));
      const slug = f.replace(/\.md$/, '');
      const html = renderBody(content);
      return {
        slug,
        title: data.title,
        description: data.description ?? '',
        date: iso(data.date),
        categories: data.categories ?? [],
        image: data.image ?? '',
        imageAlt: data.imageAlt ?? data.title,
        author: data.author ?? 'Dr. Aloka Hedau',
        draft: !!data.draft,
        readingMinutes: Math.max(1, Math.round(words(html) / 200)),
        html,
      };
    })
    .filter((p) => !p.draft && p.title)
    .sort((a, b) => b.date.localeCompare(a.date));

  posts.forEach((p, i) => {
    const { html, draft, ...meta } = p;
    const link = (q) => (q ? { slug: q.slug, title: q.title } : null);
    fs.writeFileSync(
      path.join(OUT, 'posts', p.slug + '.json'),
      JSON.stringify({ ...meta, html, newer: link(posts[i - 1]), older: link(posts[i + 1]) }),
    );
  });
  fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(posts.map(({ html, draft, ...meta }) => meta)));

  // Sidebar banners (content/banners.yml). Start/end dates are checked in the browser,
  // so a scheduled offer appears and disappears on time without a rebuild.
  const bannerFile = path.join(ROOT, 'content/banners.yml');
  const banners = fs.existsSync(bannerFile)
    ? (matter('---\n' + fs.readFileSync(bannerFile, 'utf8') + '\n---').data.banners ?? [])
        .filter((b) => b && b.active !== false && (b.title || b.text))
        .map((b) => ({
          kind: ['offer', 'announcement', 'figure', 'testimonial'].includes(b.kind) ? b.kind : 'announcement',
          title: b.title ?? '',
          text: b.text ?? '',
          author: b.author ?? '',
          link: b.link ?? '',
          linkLabel: b.linkLabel ?? '',
          start: b.start ? iso(b.start) : null,
          end: b.end ? iso(b.end) : null,
        }))
    : [];
  fs.writeFileSync(path.join(OUT, 'banners.json'), JSON.stringify(banners));

  // Sitemap for search engines (no server needed).
  const urls = [
    { loc: '/', lastmod: posts[0]?.date },
    { loc: '/about-us/' },
    { loc: '/services/' },
    { loc: '/surgeries/' },
    { loc: '/gallery/' },
    { loc: '/faq/' },
    { loc: '/contact-us/' },
    { loc: '/blog/', lastmod: posts[0]?.date },
    ...posts.map((p) => ({ loc: '/blog/' + p.slug + '/', lastmod: p.date })),
  ];
  fs.writeFileSync(
    path.join(ROOT, 'public/sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${SITE}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod.slice(0, 10)}</lastmod>` : ''}</url>`)
      .join('\n')}\n</urlset>\n`,
  );

  // The CMS preview pane uses the same article styles as the site.
  const tokens = fs.readFileSync(path.join(ROOT, 'src/styles.scss'), 'utf8').match(/:root\s*\{[\s\S]*?\n\}/)?.[0] ?? '';
  fs.writeFileSync(
    path.join(ROOT, 'public/admin/preview.css'),
    `/* generated by scripts/build-blog.mjs, do not edit */\n${tokens}\nbody{margin:0;padding:2rem;background:var(--white);color:var(--ink);font:1.0625rem/1.7 system-ui,sans-serif}\n` +
      `.preview{max-width:52rem;margin:0 auto}.preview__meta{color:var(--ink-faint);font-size:.9rem}` +
      `.preview__title{font-size:2.2rem;line-height:1.1;margin:.5rem 0 1.5rem}` +
      `.preview__cover{display:block;width:100%;max-height:420px;object-fit:contain;border-radius:14px;background:var(--card);margin-bottom:2rem}` +
      `.btn-book,.btn-wa{display:inline-block;padding:.6rem 1.1rem;border-radius:999px;font-weight:650;text-decoration:none}` +
      `.btn-book{background:var(--hope-action);color:#fff}.btn-wa{box-shadow:inset 0 0 0 1.5px var(--wa);color:var(--wa)}\n` +
      fs.readFileSync(path.join(ROOT, 'src/blog-prose.css'), 'utf8'),
  );

  console.log(`blog: ${posts.length} posts, ${banners.length} sidebar items built`);
}

build();

// npm run dev: rebuild whenever a post, image or the article styles change.
if (process.argv.includes('--watch')) {
  let timer;
  const rebuild = (why) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        build();
        console.log(`blog: rebuilt (${why})`);
      } catch (e) {
        console.error('blog: could not build, fix the post and save again:', e.message);
      }
    }, 250);
  };
  fs.watch(SRC, (_e, file) => rebuild(file ?? 'content/blog'));
  fs.watchFile(path.join(ROOT, 'content/banners.yml'), { interval: 500 }, () => rebuild('banners.yml'));
  fs.watch(path.join(ROOT, 'src/blog-prose.css'), () => rebuild('blog-prose.css'));
  console.log('blog: watching content/blog for changes…');
}
