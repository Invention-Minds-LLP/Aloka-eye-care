/**
 * Google reviews for the home page, fetched at build time: no backend, and the API key never
 * reaches the browser.
 *
 *   With GOOGLE_PLACES_API_KEY set (GitHub secret or local env):
 *     Places API (New) → rating, review count and up to 5 recent reviews → public/site-data/google-reviews.json
 *   Without a key, or if Google can't be reached:
 *     the last good copy is kept; failing that, content/google-reviews.yml (reviews copied from Google by hand,
 *     editable in the CMS) is used; failing that, the section shows just the links to Google.
 *
 * The deploy workflow also runs daily, so the reviews stay fresh.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/site-data');
const OUT = path.join(OUT_DIR, 'google-reviews.json');
const MANUAL = path.join(ROOT, 'content/google-reviews.yml');

const PLACE_ID = process.env.GOOGLE_PLACE_ID || 'ChIJgWktKqOXyzsRryWguPnW6y4';
const KEY = process.env.GOOGLE_PLACES_API_KEY || '';
const links = {
  reviewsUrl: `https://search.google.com/local/reviews?placeid=${PLACE_ID}`,
  writeUrl: `https://search.google.com/local/writereview?placeid=${PLACE_ID}`,
};

fs.mkdirSync(OUT_DIR, { recursive: true });
const save = (data) => fs.writeFileSync(OUT, JSON.stringify({ ...links, ...data, fetchedAt: new Date().toISOString() }));

async function fromGoogle() {
  const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=en`, {
    headers: {
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri',
    },
  });
  if (!res.ok) throw new Error(`Google Places ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const p = await res.json();
  return {
    source: 'google',
    rating: p.rating ?? null,
    count: p.userRatingCount ?? null,
    mapsUrl: p.googleMapsUri ?? '',
    reviews: (p.reviews ?? [])
      .filter((r) => (r.text?.text || r.originalText?.text) && r.rating >= 4)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? 'Google user',
        authorUrl: r.authorAttribution?.uri ?? '',
        photo: r.authorAttribution?.photoUri ?? '',
        rating: r.rating,
        when: r.relativePublishTimeDescription ?? '',
        date: r.publishTime ?? '',
        text: (r.text?.text || r.originalText?.text || '').trim(),
      })),
  };
}

function fromManual() {
  if (!fs.existsSync(MANUAL)) return null;
  const d = matter('---\n' + fs.readFileSync(MANUAL, 'utf8') + '\n---').data;
  const reviews = (d.reviews ?? [])
    .filter((r) => r && r.text && r.author)
    .map((r) => ({
      author: r.author,
      authorUrl: '',
      photo: '',
      rating: Number(r.rating) || 5,
      when: r.date ? new Date(r.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : '',
      date: r.date ? new Date(r.date).toISOString() : '',
      text: String(r.text).trim(),
    }));
  return { source: 'manual', rating: Number(d.rating) || null, count: Number(d.count) || null, mapsUrl: '', reviews };
}

try {
  if (!KEY) throw new Error('no GOOGLE_PLACES_API_KEY');
  const data = await fromGoogle();
  save(data);
  console.log(`reviews: ${data.reviews.length} from Google (rating ${data.rating}, ${data.count} reviews)`);
} catch (e) {
  const kept = fs.existsSync(OUT) && JSON.parse(fs.readFileSync(OUT, 'utf8'));
  if (KEY && kept?.source === 'google') {
    console.warn(`reviews: couldn't refresh (${e.message}); keeping the last copy from Google`);
  } else {
    const manual = fromManual();
    save(manual ?? { source: 'none', rating: null, count: null, mapsUrl: '', reviews: [] });
    console.log(`reviews: ${manual?.reviews.length ?? 0} from content/google-reviews.yml (${e.message})`);
  }
}
