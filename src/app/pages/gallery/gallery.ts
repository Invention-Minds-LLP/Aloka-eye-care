import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, SeoService, breadcrumbs } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { ParallaxDirective } from '../../shared/parallax.directive';
import { RevealDirective } from '../../shared/reveal.directive';
import { Rings } from '../../shared/rings';
import { SiteFooter } from '../../shared/site-footer';
import { PageBar } from '../blog/page-bar';
import { CLINIC } from '../home/home.content';
import { ALBUMS, AlbumId, GALLERY, GalleryPhoto } from '../pages.content';

/**
 * Indian NMC guidance: no photos of patients. The 'outcomes' (before/after) and 'examination' albums show patients,
 * and so do these hospital photos (a newborn being examined, and surgery on patients). Filtered here so the shared
 * GALLERY list stays untouched; drop them from pages.content.ts too when that file is next edited.
 */
const HIDDEN_ALBUMS: AlbumId[] = ['outcomes', 'examination'];
const HIDDEN_PHOTOS = new Set(['02', '03', '04', '05', '09'].map((n) => `images/gallery/the-hospital/${n}.webp`));
const PHOTOS = GALLERY.filter((p) => !HIDDEN_ALBUMS.includes(p.album) && !HIDDEN_PHOTOS.has(p.src));
const SHOWN_ALBUMS = ALBUMS.filter((a) => PHOTOS.some((p) => p.album === a.id));

const bySrc = (src: string) => PHOTOS.find((p) => p.src === src)!;
/** The three photos in the hero's collage: the doctor, the operation theatre, a conference talk. */
const COLLAGE = [
  bySrc('images/gallery/the-hospital/01.webp'),
  bySrc('images/gallery/the-hospital/08.webp'),
  bySrc('images/gallery/achievements/06.webp'),
];

@Component({
  selector: 'app-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageBar, SiteFooter, RouterLink, RevealDirective, Icon, Rings, ParallaxDirective],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
  host: { '(document:keydown)': 'onKey($event)' },
})
export default class Gallery {
  protected readonly clinic = CLINIC;
  protected readonly collage = COLLAGE;
  protected readonly filter = signal<AlbumId | 'all'>('all');
  protected readonly albums = computed(() => {
    const f = this.filter();
    return SHOWN_ALBUMS.filter((a) => f === 'all' || a.id === f).map((a) => ({ ...a, photos: PHOTOS.filter((p) => p.album === a.id) }));
  });
  protected readonly tabs = [
    { id: 'all' as const, title: 'All photos', count: PHOTOS.length },
    ...SHOWN_ALBUMS.map((a) => ({ id: a.id, title: a.title, count: PHOTOS.filter((p) => p.album === a.id).length })),
  ];

  /** The photos currently on the page, in order, for the viewer's previous / next. */
  private readonly visible = computed(() => this.albums().flatMap((a) => a.photos));
  /** Index into `visible` of the photo open in the viewer, or -1. */
  protected readonly open = signal(-1);
  protected readonly current = computed<GalleryPhoto | null>(() => this.visible()[this.open()] ?? null);
  protected readonly total = computed(() => this.visible().length);
  protected readonly albumTitle = (id: AlbumId) => ALBUMS.find((a) => a.id === id)?.title ?? '';
  /** On the three-column grid, which tiles grow so every album fills its last row:
   *  a 2×2 lead tile (n = 3k), one wide first tile (n = 3k + 2), or wide first and last tiles (n = 3k + 1). */
  protected readonly size = (i: number, n: number): 'lead' | 'wide' | null => {
    if (n < 2) return null;
    if (n % 3 === 0) return i === 0 ? 'lead' : null;
    if (n % 3 === 2) return i === 0 ? 'wide' : null;
    return n > 3 && (i === 0 || i === n - 1) ? 'wide' : null;
  };

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('viewer');
  private opener: HTMLElement | null = null;
  private touchX = 0;

  constructor() {
    inject(SeoService).set({
      title: "Gallery: Clinic, Equipment & Conferences | Dr. Aloka's Eye Care, Hyderabad",
      description:
        'Photos from Dr. Aloka’s Eye Care in KPHB, Kukatpally: the clinic, operation theatre and recovery room, diagnostic equipment, and Dr. Aloka Hedau’s talks at conferences.',
      path: '/gallery/',
      image: COLLAGE[0].src,
      jsonLd: [
        breadcrumbs(['Gallery', '/gallery/']),
        {
          '@type': 'ImageGallery',
          name: "Gallery of Dr. Aloka's Eye Care",
          url: `${SITE}/gallery/`,
          about: { '@id': SITE + '/#clinic' },
          image: PHOTOS.map((p) => ({ '@type': 'ImageObject', contentUrl: `${SITE}/${p.src}`, caption: p.caption })),
        },
      ],
    });
  }

  protected show(photo: GalleryPhoto, e: Event): void {
    this.opener = e.currentTarget as HTMLElement;
    this.open.set(this.visible().indexOf(photo));
    this.dialog().nativeElement.showModal();
  }
  protected close(): void {
    this.dialog().nativeElement.close();
  }
  /** The dialog closed (button, Esc or backdrop): return focus to the photo that opened it. */
  protected onClosed(): void {
    this.open.set(-1);
    this.opener?.focus();
  }
  protected step(by: number): void {
    const n = this.total();
    if (n) this.open.update((i) => (i + by + n) % n);
  }
  protected onKey(e: KeyboardEvent): void {
    if (this.open() < 0) return;
    if (e.key === 'ArrowRight') this.step(1);
    else if (e.key === 'ArrowLeft') this.step(-1);
  }
  protected onBackdrop(e: MouseEvent): void {
    if (e.target === this.dialog().nativeElement) this.close();
  }
  protected touchStart(e: TouchEvent): void {
    this.touchX = e.touches[0].clientX;
  }
  protected touchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.touchX;
    if (Math.abs(dx) > 50) this.step(dx < 0 ? 1 : -1);
  }
}
