import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MotionService, clamp } from '../../core/motion.service';
import { SeoService, breadcrumbs } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { Lea } from '../../shared/lea';
import { RevealDirective } from '../../shared/reveal.directive';
import { SiteFooter } from '../../shared/site-footer';
import { PageBar } from '../blog/page-bar';
import { CLINIC, VOICES } from '../home/home.content';
import { AFFILIATIONS, JOURNEY } from '../pages.content';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageBar, SiteFooter, RouterLink, RevealDirective, Icon, Lea],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export default class About {
  protected readonly clinic = CLINIC;
  protected readonly journey = JOURNEY;
  protected readonly affiliations = AFFILIATIONS;
  protected readonly voices = VOICES;
  /** 0..1, how far the career line has drawn. */
  protected readonly drawn = signal(0);
  private readonly line = viewChild.required<ElementRef<HTMLElement>>('line');

  constructor() {
    inject(SeoService).set({
      title: 'Dr. Aloka Hedau, Paediatric Ophthalmologist & Squint Surgeon in Hyderabad | About',
      description:
        'Meet Dr. Aloka Hedau: senior paediatric ophthalmologist and adult squint surgeon in Kukatpally, Hyderabad. Aravind-trained, FICO (UK), 20+ years of experience.',
      path: '/about-us/',
      type: 'website',
      jsonLd: [breadcrumbs(['About Dr. Aloka', '/about-us/'])],
    });

    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const el = this.line().nativeElement;
      let p = 0;
      motion.register(
        {
          read: () => {
            const r = el.getBoundingClientRect();
            // the line's tip follows a point 60% down the screen
            p = clamp((motion.viewportH * 0.6 - r.top) / r.height);
          },
          write: () => this.drawn.set(motion.reduced() ? 1 : p),
        },
        destroyRef,
      );
    });
  }

  /** Has the drawn line reached milestone i? */
  protected lit(i: number): boolean {
    return this.drawn() >= (i + 0.3) / this.journey.length;
  }
}
