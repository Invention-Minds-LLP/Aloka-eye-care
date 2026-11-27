import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SITE, SeoService, breadcrumbs } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { ParallaxDirective } from '../../shared/parallax.directive';
import { RevealDirective } from '../../shared/reveal.directive';
import { Rings } from '../../shared/rings';
import { SiteFooter } from '../../shared/site-footer';
import { PageBar } from '../blog/page-bar';
import { CLINIC } from '../home/home.content';
import { SERVICES } from '../pages.content';

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageBar, SiteFooter, RouterLink, RevealDirective, Icon, Rings, ParallaxDirective, NgTemplateOutlet],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export default class Services {
  protected readonly clinic = CLINIC;
  protected readonly services = SERVICES;
  /** The service being read, for the index. */
  protected readonly active = signal(SERVICES[0].id);

  constructor() {
    inject(SeoService).set({
      title: 'Myopia Clinic, Vision Therapy & Amblyopia Care in Kukatpally, Hyderabad | Services',
      description:
        'Myopia clinic, low vision aids, vision therapy, online vision therapy programmes and amblyopia (lazy eye) care at Dr. Aloka’s Eye Care, KPHB, Kukatpally, Hyderabad.',
      path: '/services/',
      image: 'images/services/paediatric-evaluation.webp',
      jsonLd: [
        breadcrumbs(['Services', '/services/']),
        {
          '@type': 'ItemList',
          name: "Services at Dr. Aloka's Eye Care",
          itemListElement: SERVICES.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'MedicalTherapy',
              name: s.title,
              description: s.lead,
              url: `${SITE}/services/#${s.id}`,
              provider: { '@id': SITE + '/#clinic' },
            },
          })),
        },
      ],
    });

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) this.active.set(e.target.id);
        },
        { rootMargin: '-40% 0px -55% 0px' },
      );
      document.querySelectorAll('.svc').forEach((el) => io.observe(el));

      /* the service cards tilt a little towards a mouse pointer (CSS vars only; none for touch or reduced motion) */
      const off: (() => void)[] = [];
      if (matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll<HTMLElement>('.cards .card').forEach((c) => {
          const move = (e: PointerEvent) => {
            const r = c.getBoundingClientRect();
            c.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 10).toFixed(2) + 'deg');
            c.style.setProperty('--rx', (-((e.clientY - r.top) / r.height - 0.5) * 8).toFixed(2) + 'deg');
          };
          const leave = () => {
            c.style.setProperty('--rx', '0deg');
            c.style.setProperty('--ry', '0deg');
          };
          c.addEventListener('pointermove', move, { passive: true });
          c.addEventListener('pointerleave', leave);
          off.push(() => {
            c.removeEventListener('pointermove', move);
            c.removeEventListener('pointerleave', leave);
          });
        });
      }

      destroyRef.onDestroy(() => {
        io.disconnect();
        off.forEach((f) => f());
      });
    });
  }
}
