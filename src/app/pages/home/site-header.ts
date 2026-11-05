import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, input, signal } from '@angular/core';
import { MotionService } from '../../core/motion.service';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';
import { NAV } from '../blog/page-bar';
import { CLINIC } from './home.content';

export interface Chapter {
  id: string;
  label: string;
}

/** The home page's sections, for the side rail. */
export const CHAPTERS: readonly Chapter[] = [
  { id: 'top', label: 'Welcome' },
  { id: 'results', label: 'Patient results' },
  { id: 'doctor', label: 'The doctor' },
  { id: 'equipment', label: 'Our equipment' },
  { id: 'squint-surgery', label: 'Squint surgery' },
  { id: 'myopia', label: 'Myopia clinic' },
  { id: 'trust', label: 'Why families trust us' },
  { id: 'visit', label: 'Visit' },
];

/** The illustrated family story on /our-story/. */
export const STORY_CHAPTERS: readonly Chapter[] = [
  { id: 'top', label: 'Arriving worried' },
  { id: 'consult', label: 'Meeting Dr. Aloka' },
  { id: 'care', label: 'Treatment' },
  { id: 'joy', label: 'Going home happy' },
];

@Component({
  selector: 'app-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RouterLink],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  protected readonly clinic = CLINIC;
  readonly chapters = input<readonly Chapter[]>(CHAPTERS);
  /** Other pages; Home is where we are. */
  protected readonly nav = NAV.filter((n) => n.path !== '/');
  protected readonly menuOpen = signal(false);
  protected readonly solid = signal(false);
  protected readonly active = signal(-1);
  protected readonly progress = signal(0);
  /** One committing key per view: the header yields when a page Book key is visible. */
  protected readonly yieldBook = signal(false);

  constructor() {
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let chapterEls: HTMLElement[] = [];
      let pageKeys: HTMLElement[] = [];
      let yieldBook = false;
      const collect = () => {
        pageKeys = Array.from(document.querySelectorAll<HTMLElement>('main .btn-book'));
        // keep indices aligned with the rail, even if a section is missing
        chapterEls = this.chapters().map((c) => document.getElementById(c.id) as HTMLElement);
      };
      collect();
      let active = -1;
      let progress = 0;
      let solid = false;
      motion.register(
        {
          read: () => {
            if (!chapterEls.some(Boolean)) collect();
            const vh = motion.viewportH;
            active = -1;
            chapterEls.forEach((el, i) => {
              if (el && el.getBoundingClientRect().top < vh * 0.45) active = i;
            });
            const max = document.documentElement.scrollHeight - vh;
            progress = max > 0 ? window.scrollY / max : 0;
            solid = window.scrollY > 24;
            yieldBook = pageKeys.some((k) => {
              const r = k.getBoundingClientRect();
              return r.bottom > 72 && r.top < vh;
            });
          },
          write: () => {
            this.active.set(active);
            this.progress.set(progress);
            this.solid.set(solid);
            this.yieldBook.set(yieldBook);
          },
        },
        destroyRef,
      );
    });
  }
}
