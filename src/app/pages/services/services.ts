import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, SeoService, breadcrumbs } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { LEA_SHAPES, Lea } from '../../shared/lea';
import { RevealDirective } from '../../shared/reveal.directive';
import { SiteFooter } from '../../shared/site-footer';
import { PageBar } from '../blog/page-bar';
import { CLINIC } from '../home/home.content';
import { SERVICES } from '../pages.content';

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageBar, SiteFooter, RouterLink, RevealDirective, Icon, Lea],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export default class Services {
  protected readonly clinic = CLINIC;
  protected readonly services = SERVICES;
  protected readonly shapes = LEA_SHAPES;
  /** The service being read, for the index. */
  protected readonly active = signal(SERVICES[0].id);

  constructor() {
    inject(SeoService).set({
      title: "Children's Eye Care, Squint & Myopia Treatment in Kukatpally, Hyderabad | Services",
      description:
        'Paediatric eye check-ups, squint treatment, myopia control, vision therapy, ROP screening and low vision aids at Dr. Aloka’s Eye Care, KPHB, Kukatpally, Hyderabad.',
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
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
