# Blog: how it works and how to go live on cPanel

The blog runs without WordPress and without a server-side app. Posts are Markdown files in this repo,
edited through **Decap CMS** at `/admin`, and built into static files that any host (cPanel or Netlify) can serve.

```
Clinic writes a post at  https://dralokaseyecare.com/admin
        │  Decap CMS saves content/blog/<slug>.md (and images) to GitHub
        ▼
GitHub Actions (.github/workflows/deploy-cpanel.yml)
        │  npm ci → npm run build   (prebuild runs scripts/build-blog.mjs)
        ▼
FTP upload of dist/dralokas-eye-care/browser/  →  cPanel public_html/   (live in ~2–3 min)
```

## What's where

| Path | What it is |
|---|---|
| `content/blog/*.md` | The posts (front matter + Markdown). The six WordPress posts were migrated here. |
| `public/images/blog/` | Post images (uploads from the CMS land here). |
| `scripts/build-blog.mjs` | Turns the posts into `public/blog-data/*.json` and `public/sitemap.xml`, and renders the designed blocks. Runs automatically before `npm start` / `npm run build`. |
| `src/blog-prose.css` | Article and block styles, shared by the site and the CMS preview. |
| `src/app/pages/blog/` | The `/blog` list and `/blog/:slug` article pages. |
| `public/admin/` | The CMS: `config.yml` (fields, collection) and `index.html` (editor buttons for the blocks). |
| `public/oauth/auth.php` | The small GitHub login helper for the CMS on cPanel. |
| `public/.htaccess` | cPanel rules: HTTPS, old WordPress URLs → new blog, app routing, caching. |
| `netlify.toml` | The same routing for Netlify, if used for staging. |

### Designed blocks available in the editor
Image + text (side by side, image left or right) · Tip box · Book / WhatsApp box · Patient quote · Questions and answers · Image with caption · Before / after slider.
They are stored in the post as `:::name … :::` and rendered by `scripts/build-blog.mjs`.
To add a new block, add it in **both** `scripts/build-blog.mjs` (`BLOCKS`) and `public/admin/index.html` (`registerEditorComponent`), and style it in `src/blog-prose.css`.

## One-time setup for cPanel

### 1. FTP account for deploys
cPanel → **FTP Accounts** → create an account whose directory is `public_html` (or the site folder).

### 2. GitHub repository secrets
GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Example |
|---|---|
| `FTP_SERVER` | `ftp.dralokaseyecare.com` |
| `FTP_USERNAME` | the FTP account from step 1 |
| `FTP_PASSWORD` | its password |
| `FTP_SERVER_DIR` | optional; default `public_html/` (must end with `/`) |

The workflow uses FTPS. If the host only allows plain FTP, change `protocol: ftps` to `protocol: ftp` in the workflow.
Push to `main` (or run the workflow by hand under **Actions**) to deploy.

### 3. GitHub OAuth app (the editor's login)
GitHub → your org or account → **Settings → Developer settings → OAuth Apps → New OAuth App**:
- Homepage URL: `https://dralokaseyecare.com`
- Authorization callback URL: `https://dralokaseyecare.com/oauth/auth.php`

Then, in cPanel **File Manager**, create `decap-oauth-config.php` in the account's **home folder, one level above `public_html`**
(so it can never be downloaded):

```php
<?php return [
  'client_id'     => 'your-client-id',
  'client_secret' => 'your-client-secret',
  'site_origin'   => 'https://dralokaseyecare.com',
];
```

Requirements: PHP 8.1+ with cURL (standard on cPanel).

### 4. Give the clinic access
The person writing posts needs a free GitHub account with **write access** to
`Invention-Minds-LLP/Aloka-eye-care` (repo → Settings → Collaborators, or an org team).
They then go to `https://dralokaseyecare.com/admin` → **Login with GitHub**.

## Writing and testing posts locally (no login, no deploy)

```
npm run dev              # blog watcher + Decap local server + site on http://localhost:4200
PORT=4300 npm run dev    # if port 4200 is already in use
```

1. Open `http://localhost:4200/admin/index.html` and press **Login** (no GitHub needed).
2. **＋ Blog post** → write the post → **Publish → Publish now**.
3. The post is saved to `content/blog/` on your machine and shows on `http://localhost:4200/blog` within a second (refresh the page).

Nothing reaches the live site until you commit and push. To throw a test post away, delete its file from
`content/blog/` (or use **Delete entry** in the editor).

## Switching hosts
- **Different domain:** update `base_url`, `site_url` in `public/admin/config.yml`, `site_origin` in the PHP config, the OAuth app URLs, and `SITE` in `scripts/build-blog.mjs`.
- **Netlify instead of cPanel:** PHP doesn't run on Netlify. Either keep the OAuth helper on any PHP host and point `base_url` at it, or switch the CMS backend to Netlify Identity + Git Gateway.

## Notes
- Images uploaded in the CMS are not resized automatically; ask the clinic to keep them under 1 MB (the editor says so).
- Posts marked **Draft** are saved to GitHub but not shown on the site.
- The old WordPress post addresses (e.g. `/myopia-or-short-sightedness-in-children/`) redirect permanently to `/blog/<slug>`, so search rankings carry over.
