import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, SeoService, breadcrumbs } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { SiteFooter } from '../../shared/site-footer';
import { PageBar } from '../blog/page-bar';
import { CLINIC } from '../home/home.content';
import { FAQ_GROUPS, FaqItem } from '../pages.content';

/** Questions that float around the eye in the hero; each one jumps to its answer. */
const FLOATING = ['squint-lucky', 'painful', 'first-examination', 'age-40'];

@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageBar, SiteFooter, RouterLink, RevealDirective, Icon],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export default class Faq {
  protected readonly clinic = CLINIC;
  private readonly all = FAQ_GROUPS.flatMap((g) => g.items);
  protected readonly floating = FLOATING.map((id) => this.all.find((i) => i.id === id)!);
  protected readonly total = this.all.length;

  protected readonly query = signal('');
  protected readonly groups = computed(() => {
    const words = this.query().toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return FAQ_GROUPS;
    const hit = (i: FaqItem) => words.every((w) => (i.q + ' ' + i.a).toLowerCase().includes(w));
    return FAQ_GROUPS.map((g) => ({ ...g, items: g.items.filter(hit) })).filter((g) => g.items.length);
  });
  protected readonly found = computed(() => this.groups().reduce((n, g) => n + g.items.length, 0));
  /** The question opened by a link (hero bubble or #hash); the rest start closed. */
  protected readonly opened = signal<string | null>(null);

  /** Where the eye looks, -1..1 on each axis. */
  protected readonly look = signal({ x: 0, y: 0 });

  constructor() {
    inject(SeoService).set({
      title: "Squint & Children's Eye FAQ | Dr. Aloka's Eye Care, Kukatpally, Hyderabad",
      description:
        'Answers from paediatric ophthalmologist Dr. Aloka Hedau: is squint surgery painful, will it scar, is squint lucky, when should a child have the first eye test, and more. KPHB, Kukatpally, Hyderabad.',
      path: '/faq/',
      jsonLd: [
        breadcrumbs(['FAQ', '/faq/']),
        {
          '@type': 'FAQPage',
          url: `${SITE}/faq/`,
          mainEntity: this.all.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
        },
      ],
    });

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (id && this.all.some((i) => i.id === id)) this.jump(id);

      if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(pointer: fine)').matches) return;
      let frame = 0;
      const onMove = (e: PointerEvent) => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          const eye = document.querySelector('.eye');
          if (!eye) return;
          const r = eye.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
          const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
          this.look.set({ x: Math.max(-1, Math.min(1, dx)), y: Math.max(-1, Math.min(1, dy)) });
        });
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      destroyRef.onDestroy(() => {
        window.removeEventListener('pointermove', onMove);
        cancelAnimationFrame(frame);
      });
    });
  }

  protected setQuery(e: Event): void {
    this.query.set((e.target as HTMLInputElement).value);
  }

  /** Open one answer and bring it into view. */
  protected jump(id: string, e?: Event): void {
    e?.preventDefault();
    this.query.set('');
    this.opened.set(id);
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      (el as HTMLDetailsElement).open = true;
      el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      el.querySelector('summary')?.focus({ preventScroll: true });
      history.replaceState(null, '', '#' + id);
    });
  }
}
