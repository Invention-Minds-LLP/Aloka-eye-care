import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { Icon } from '../../../shared/icon';

type State = 'waiting' | 'playing' | 'paused' | 'done';

/** Seconds of reading time before the story starts on its own. */
const COUNTDOWN = 3.5;
/** Seconds the story takes to travel one screen height. */
const SECONDS_PER_SCREEN = 3.8;

/**
 * Plays the story by itself: after a short countdown the page glides through
 * the four scenes. Any scroll, swipe or key hands control straight back to the
 * visitor; the button pauses, resumes or replays. Hidden under reduced motion.
 */
@Component({
  selector: 'app-story-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <div class="player" [class.is-hidden]="!visible()" role="group" aria-label="Story player">
      <button type="button" class="player__btn" (click)="toggle()" [attr.aria-label]="label()">
        <svg class="player__ring" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="18" pathLength="100" [attr.stroke-dashoffset]="100 - ring() * 100" />
        </svg>
        <app-icon [name]="state() === 'playing' ? 'pause' : state() === 'done' ? 'replay' : 'play'" />
      </button>
      <p class="player__text" aria-live="polite">
        <strong>{{ title() }}</strong>
        <span>{{ hint() }}</span>
      </p>
    </div>
  `,
  styleUrl: './story-player.scss',
})
export class StoryPlayer {
  protected readonly state = signal<State>('waiting');
  protected readonly visible = signal(false);
  private readonly countdown = signal(0);
  private readonly progress = signal(0);

  protected readonly ring = computed(() => (this.state() === 'waiting' ? this.countdown() : this.progress()));
  protected readonly title = computed(() => {
    switch (this.state()) {
      case 'waiting':
        return `Their story starts in ${Math.max(1, Math.ceil(COUNTDOWN * (1 - this.countdown())))}…`;
      case 'playing':
        return 'Playing their story';
      case 'paused':
        return 'Play their story';
      default:
        return 'Watch it again';
    }
  });
  protected readonly hint = computed(() => {
    switch (this.state()) {
      case 'playing':
        return 'Scroll anytime to take over';
      case 'done':
        return 'From the worried arrival to the smiles';
      default:
        return 'Or scroll at your own pace';
    }
  });
  protected readonly label = computed(() =>
    this.state() === 'playing' ? 'Pause the story' : this.state() === 'done' ? 'Replay the story' : 'Play the story',
  );

  private raf = 0;
  private startedAt = 0;
  private last = 0;
  private y = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const story = document.querySelector<HTMLElement>('app-story');
      if (!story) return;

      const bounds = () => {
        const top = story.getBoundingClientRect().top + window.scrollY;
        return { start: top, end: top + story.offsetHeight - window.innerHeight };
      };

      // The visitor always wins: any deliberate input takes over from the player.
      const takeOver = () => {
        if (this.state() === 'playing' || this.state() === 'waiting') this.pause();
      };
      const onKey = (e: KeyboardEvent) => {
        if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(e.key)) takeOver();
      };
      const onPointer = (e: PointerEvent) => {
        if (!(e.target as HTMLElement).closest('.player')) takeOver();
      };
      window.addEventListener('wheel', takeOver, { passive: true });
      window.addEventListener('touchstart', takeOver, { passive: true });
      window.addEventListener('keydown', onKey);
      window.addEventListener('pointerdown', onPointer);

      const onScroll = () => {
        const { start, end } = bounds();
        this.progress.set(Math.min(1, Math.max(0, (window.scrollY - start) / (end - start))));
        this.visible.set(window.scrollY < end + window.innerHeight * 0.25);
        if (this.state() === 'paused' && window.scrollY >= end - 2) this.state.set('done');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      destroyRef.onDestroy(() => {
        cancelAnimationFrame(this.raf);
        window.removeEventListener('wheel', takeOver);
        window.removeEventListener('touchstart', takeOver);
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('pointerdown', onPointer);
        window.removeEventListener('scroll', onScroll);
      });

      // Only count down when the visit starts at the top of the page.
      if (window.scrollY > 40) {
        this.state.set('paused');
        return;
      }
      this.startedAt = performance.now();
      const tick = (now: number) => {
        if (this.state() === 'waiting') {
          const t = (now - this.startedAt) / 1000 / COUNTDOWN;
          this.countdown.set(Math.min(1, t));
          if (t >= 1) {
            this.play();
            return;
          }
          this.raf = requestAnimationFrame(tick);
        }
      };
      this.raf = requestAnimationFrame(tick);
    });
  }

  protected toggle(): void {
    const s = this.state();
    if (s === 'playing') this.pause();
    else if (s === 'done') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      this.play();
    } else this.play();
  }

  private pause(): void {
    cancelAnimationFrame(this.raf);
    this.state.set('paused');
  }

  private play(): void {
    const story = document.querySelector<HTMLElement>('app-story');
    if (!story) return;
    cancelAnimationFrame(this.raf);
    this.state.set('playing');
    this.y = window.scrollY;
    this.last = performance.now();
    const step = (now: number) => {
      if (this.state() !== 'playing') return;
      const top = story.getBoundingClientRect().top + window.scrollY;
      const end = top + story.offsetHeight - window.innerHeight;
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      this.y = Math.max(this.y, window.scrollY) + (window.innerHeight / SECONDS_PER_SCREEN) * dt;
      if (this.y >= end) {
        window.scrollTo({ top: end, behavior: 'instant' as ScrollBehavior });
        this.state.set('done');
        return;
      }
      window.scrollTo({ top: this.y, behavior: 'instant' as ScrollBehavior });
      this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }
}
