import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Marks the host `.is-in` the first time it enters the viewport.
 * Content is visible by default; the hidden start state only applies
 * under `html.motion-ok`, which the app sets when motion is allowed.
 */
@Directive({ selector: '[appReveal]', host: { class: 'reveal' } })
export class RevealDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        this.el.classList.add('is-in');
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              this.el.classList.add('is-in');
              io.disconnect();
            }
          }
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
      );
      io.observe(this.el);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
