/**
 * npm run dev — everything needed to write and preview posts locally, in one terminal:
 *   1. the blog builder in watch mode (a saved post shows on the site at once)
 *   2. Decap's local server (the editor at /admin/index.html writes straight to content/blog, no GitHub login)
 *   3. the Angular dev server on http://localhost:4200 (or PORT)
 * Ctrl+C stops all three.
 */
import { spawn, spawnSync } from 'node:child_process';

/** Use another port if 4200 is busy: PORT=4300 npm run dev */
const PORT = process.env.PORT || '4200';

const run = (name, cmd, args, env = {}) => {
  const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'], shell: true, env: { ...process.env, ...env } });
  const tag = (chunk) =>
    chunk
      .toString()
      .split(/\r?\n/)
      .filter(Boolean)
      .forEach((line) => console.log(`[${name}] ${line}`));
  child.stdout.on('data', tag);
  child.stderr.on('data', tag);
  child.on('exit', (code) => {
    console.log(`[${name}] stopped (${code ?? 'signal'})`);
    // The editor's local server may already be running from another terminal; the site keeps going.
    if (name === 'cms') console.log('[cms] (if port 8081 is busy, another npm run dev is already serving the editor)');
    else stopAll();
  });
  return child;
};

// Google reviews once at start (uses GOOGLE_PLACES_API_KEY if set).
spawnSync('node', ['scripts/fetch-reviews.mjs'], { stdio: 'inherit', shell: true });

const children = [
  run('blog', 'node', ['scripts/build-blog.mjs', '--watch']),
  // decap-server also reads PORT, so pin it to its own port (the editor expects 8081)
  run('cms', 'npx', ['decap-server'], { PORT: '8081' }),
  run('site', 'npx', ['ng', 'serve', '--port', PORT]),
];

let stopping = false;
function stopAll() {
  if (stopping) return;
  stopping = true;
  for (const c of children) if (!c.killed) c.kill();
  setTimeout(() => process.exit(0), 300);
}
process.on('SIGINT', stopAll);
process.on('SIGTERM', stopAll);

console.log(`\n  Site:          http://localhost:${PORT}`);
console.log(`  Blog editor:   http://localhost:${PORT}/admin/index.html  (press "Login", no GitHub needed)\n`);
