import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, SeoService, breadcrumbs } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { SiteFooter } from '../../shared/site-footer';
import { PageBar } from '../blog/page-bar';
import { CLINIC } from '../home/home.content';
import { ALBUMS, AlbumId, GALLERY, GalleryPhoto } from '../pages.content';

/** The photos fanned out on the hero's light table, one from each album. */
const FAN = [GALLERY[23], GALLERY[36], GALLERY[11], GALLERY[4], GALLERY[26]];

@Component({
  selector: 'app-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageBar, SiteFooter, RouterLink, RevealDirective, Icon],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
  host: { '(document:keydown)': 'onKey($event)' },
})
export default class Gallery {
  protected readonly clinic = CLINIC;
  protected readonly fan = FAN;
  protected readonly filter = signal<AlbumId | 'all'>('all');
  protected readonly albums = computed(() => {
    const f = this.filter();
    return ALBUMS.filter((a) => f === 'all' || a.id === f).map((a) => ({ ...a, photos: GALLERY.filter((p) => p.album === a.id) }));
  });
  protected readonly tabs = [
    { id: 'all' as const, title: 'All photos', count: GALLERY.length },
    ...ALBUMS.map((a) => ({ id: a.id, title: a.title, count: GALLERY.filter((p) => p.album === a.id).length })),
  ];

  /** The photos currently on the page, in order, for the viewer's previous / next. */
  private readonly visible = computed(() => this.albums().flatMap((a) => a.photos));
  /** Index into `visible` of the photo open in the viewer, or -1. */
  protected readonly open = signal(-1);
  protected readonly current = computed<GalleryPhoto | null>(() => this.visible()[this.open()] ?? null);
  protected readonly total = computed(() => this.visible().length);
  protected readonly albumTitle = (id: AlbumId) => ALBUMS.find((a) => a.id === id)?.title ?? '';

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('viewer');
  private opener: HTMLElement | null = null;
  private touchX = 0;

  constructor() {
    inject(SeoService).set({
      title: "Gallery: Clinic, Surgery Results & Conferences | Dr. Aloka's Eye Care, Hyderabad",
      description:
        'Photos from Dr. Aloka’s Eye Care in KPHB, Kukatpally: the clinic and operation theatre, children’s eye examinations, squint surgery before-and-after results, and Dr. Aloka Hedau’s talks at conferences.',
      path: '/gallery/',
      image: GALLERY[23].src,
      jsonLd: [
        breadcrumbs(['Gallery', '/gallery/']),
        {
          '@type': 'ImageGallery',
          name: "Gallery of Dr. Aloka's Eye Care",
          url: `${SITE}/gallery/`,
          about: { '@id': SITE + '/#clinic' },
          image: GALLERY.map((p) => ({ '@type': 'ImageObject', contentUrl: `${SITE}/${p.src}`, caption: p.caption })),
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
