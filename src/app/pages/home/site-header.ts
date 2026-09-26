import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { MotionService } from '../../core/motion.service';
import { Icon } from '../../shared/icon';
import { CLINIC } from './home.content';

export const CHAPTERS = [
  { id: 'top', label: 'Arriving worried' },
  { id: 'consult', label: 'Meeting Dr. Aloka' },
  { id: 'care', label: 'Treatment' },
  { id: 'joy', label: 'Going home happy' },
  { id: 'doctor', label: 'The doctor' },
  { id: 'trust', label: 'Why families trust us' },
  { id: 'visit', label: 'Visit' },
] as const;

@Component({
  selector: 'app-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  protected readonly clinic = CLINIC;
  protected readonly chapters = CHAPTERS;
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
        chapterEls = CHAPTERS.map((c) => document.getElementById(c.id)).filter((e): e is HTMLElement => !!e);
      };
      collect();
      let active = -1;
      let progress = 0;
      let solid = false;
      motion.register(
        {
          read: () => {
            if (!chapterEls.length) collect();
            const vh = motion.viewportH;
            active = -1;
            chapterEls.forEach((el, i) => {
              if (el.getBoundingClientRect().top < vh * 0.45) active = i;
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
