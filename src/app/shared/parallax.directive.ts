import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { MotionService } from '../core/motion.service';

/**
 * Background parallax: the host drifts at its own speed as its section scrolls past.
 * `appParallax` is the speed (negative drifts the other way). Transform only, one shared rAF loop,
 * and nothing at all when the visitor prefers reduced motion.
 */
@Directive({ selector: '[appParallax]' })
export class ParallaxDirective {
  readonly speed = input(0.12, { alias: 'appParallax' });
  /** Also turn slowly with the scroll (for the rings). */
  readonly spin = input(true);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let y = 0;
      let top = 0;
      let visible = false;
      motion.register(
        {
          read: () => {
            const host = (this.el.parentElement ?? this.el).getBoundingClientRect();
            visible = host.bottom > -200 && host.top < motion.viewportH + 200;
            if (!visible) return;
            top = host.top;
            y = (host.top + host.height / 2 - motion.viewportH / 2) * this.speed();
          },
          write: () => {
            if (!visible) return;
            if (motion.reduced()) {
              this.el.style.transform = '';
              return;
            }
            this.el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)${this.spin() ? ` rotate(${(top * 0.03).toFixed(1)}deg)` : ''}`;
          },
        },
        destroyRef,
      );
    });
  }
}
