import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, signal } from '@angular/core';
import { Icon } from '../../../shared/icon';
import { CLINIC, TELUGU, VOICES } from '../home.content';
import { Child, Doctor, Mood, Mother } from './people';
import { SceneProgressDirective, lerp, span } from './scene-progress.directive';
import { Auto, Metro, Room, Skyline, Street } from './scenery';
import { StoryPlayer } from './story-player';

/**
 * The family's visit in four scroll scenes: arriving worried, the consultation,
 * treatment, and walking out happy. Each scene pins a full-screen stage while
 * its scroll length plays the action; layers move at different depths.
 */
@Component({
  selector: 'app-story',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Mother, Child, Doctor, Skyline, Metro, Street, Auto, Room, SceneProgressDirective, StoryPlayer],
  templateUrl: './story.html',
  styleUrl: './story.scss',
})
export class Story {
  protected readonly clinic = CLINIC;
  protected readonly te = TELUGU;
  protected readonly thanks = VOICES[0];
  protected readonly listens = VOICES[1];
  protected readonly span = span;
  protected readonly lerp = lerp;
  protected readonly stickers = Array.from({ length: 12 }, (_, i) => i);
  /** Phones walk the cast over shorter distances. */
  protected readonly narrow = signal(false);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const mq = window.matchMedia('(max-width: 700px)');
      const sync = () => this.narrow.set(mq.matches);
      sync();
      mq.addEventListener('change', sync);
      destroyRef.onDestroy(() => mq.removeEventListener('change', sync));

      // Each stage reserves the height its story caption actually takes, so the
      // scenery below can never run under the words, whatever the screen shape.
      const stages = Array.from(this.host.querySelectorAll<HTMLElement>('.stage'));
      const measure = () => {
        for (const stage of stages) {
          const caps = Array.from(stage.querySelectorAll<HTMLElement>('.caption--story'));
          if (!caps.length) continue;
          const bottom = Math.max(...caps.map((c) => c.offsetTop + c.offsetHeight));
          stage.style.setProperty('--band', `${Math.ceil(bottom + 20)}px`);
          const sign = stage.querySelector<HTMLElement>('.clinic-sign');
          const block = stage.querySelector<SVGGraphicsElement>('.clinic-block');
          if (sign && block) {
            const sr = stage.getBoundingClientRect();
            const br = block.getBoundingClientRect();
            stage.style.setProperty('--sign-x', `${Math.round(br.left - sr.left + br.width * 0.42)}px`);
            // posts down to the roof when the board stands above it
            const gap = br.top - sign.getBoundingClientRect().bottom;
            stage.style.setProperty('--sign-post', `${Math.max(0, Math.round(gap))}px`);
          }
        }
      };
      measure();
      const ro = new ResizeObserver(measure);
      stages.forEach((st) => {
        ro.observe(st);
        st.querySelectorAll('.caption--story').forEach((c) => ro.observe(c));
      });
      destroyRef.onDestroy(() => ro.disconnect());
    });
  }

  /** Faces soften as the consultation goes on. */
  protected consultMood(p: number, calmAt: number, smileAt: number): Mood {
    return p >= smileAt ? 'smile' : p >= calmAt ? 'calm' : 'worried';
  }
}
