import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE, SeoService, breadcrumbs } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { ParallaxDirective } from '../../shared/parallax.directive';
import { RevealDirective } from '../../shared/reveal.directive';
import { Rings } from '../../shared/rings';
import { SiteFooter } from '../../shared/site-footer';
import { PageBar } from '../blog/page-bar';
import { CLINIC } from '../home/home.content';
import { SURGERIES } from '../pages.content';

const FAQ = [
  { q: 'Is squint surgery painful?', a: 'No. It is done under local or general anaesthesia and is not painful at all.' },
  { q: 'Will there be a scar?', a: 'Minimal-incision surgery with absorbable sutures leaves no external scarring.' },
  { q: 'Is squint surgery only cosmetic?', a: 'No. It restores binocular vision and depth perception, improves visual acuity and helps reverse lazy eye.' },
  { q: 'Is there an age limit for squint correction?', a: 'Age is no bar. Before age 8 is ideal for vision, but a squint can be corrected at any age.' },
];

@Component({
  selector: 'app-surgeries',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageBar, SiteFooter, RouterLink, RevealDirective, Icon, Rings, ParallaxDirective],
  templateUrl: './surgeries.html',
  styleUrl: './surgeries.scss',
})
export default class Surgeries {
  protected readonly clinic = CLINIC;
  protected readonly faq = FAQ;
  protected readonly filter = signal<'All' | 'Children' | 'Adults'>('All');
  protected readonly shown = computed(() => {
    const f = this.filter();
    return f === 'All' ? SURGERIES : SURGERIES.filter((s) => s.tags.includes(f));
  });
  protected readonly reveal = signal(50);

  constructor() {
    inject(SeoService).set({
      title: 'Squint Surgery & Paediatric Cataract Surgery in Hyderabad | Dr. Aloka’s Eye Care',
      description:
        'Paediatric cataract and probing, exotropia and esotropia surgery, complex squint, nystagmus, adult squint correction and oculoplasty by Dr. Aloka Hedau in KPHB, Kukatpally, Hyderabad.',
      path: '/surgeries/',
      image: 'images/surgeries/squint-child.webp',
      jsonLd: [
        breadcrumbs(['Surgeries', '/surgeries/']),
        {
          '@type': 'ItemList',
          name: "Surgeries at Dr. Aloka's Eye Care",
          itemListElement: SURGERIES.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'MedicalProcedure',
              name: s.title,
              description: s.body,
              procedureType: 'https://schema.org/SurgicalProcedure',
              url: `${SITE}/surgeries/#${s.id}`,
            },
          })),
        },
      ],
    });
  }
}
