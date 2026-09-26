import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';
import { MotionService, clamp } from '../../../core/motion.service';

/**
 * A scroll-length scene with a sticky stage inside. Exposes `p`, 0 as the
 * scene's stage pins to 1 as it releases, and writes it to `--p` for CSS.
 * With reduced motion the scene holds one still frame at `restAt`.
 */
@Directive({ selector: '[appSceneProgress]', exportAs: 'scene' })
export class SceneProgressDirective {
  readonly restAt = input(1);
  readonly p = signal(0);
  /** Pointer lean, -1..1, for depth layers. */
  readonly px = signal(0);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let p = 0;
      let visible = false;
      motion.register(
        {
          read: () => {
            const r = el.getBoundingClientRect();
            const travel = r.height - motion.viewportH;
            visible = r.top < motion.viewportH && r.bottom > 0;
            p = travel > 0 ? clamp(-r.top / travel) : 1;
          },
          write: () => {
            if (!visible) return;
            const value = motion.reduced() ? this.restAt() : p;
            this.p.set(value);
            this.px.set(motion.reduced() ? 0 : motion.pointerX);
            el.style.setProperty('--p', value.toFixed(4));
            el.style.setProperty('--px', (motion.reduced() ? 0 : motion.pointerX).toFixed(3));
          },
        },
        destroyRef,
      );
    });
  }
}

/** Linear interpolation over a sub-range of progress: 0 before `a`, 1 after `b`. */
export const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
