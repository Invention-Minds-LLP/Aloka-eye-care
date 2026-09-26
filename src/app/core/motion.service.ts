import { DestroyRef, Injectable, NgZone, inject, signal } from '@angular/core';

type Frame = { read: () => void; write: () => void };

/**
 * One rAF loop for every scroll/pointer-driven effect on the page.
 * Subscribers split work into a read phase (layout) and a write phase
 * (transforms) so parallax never thrashes layout.
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly zone = inject(NgZone);
  private readonly frames = new Set<Frame>();
  private ticking = false;

  readonly reduced = signal(false);
  /** Pointer position normalised to -1..1 from the viewport centre. */
  pointerX = 0;
  pointerY = 0;
  viewportH = 800;

  constructor() {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reduced.set(mq.matches);
    mq.addEventListener('change', (e) => {
      this.reduced.set(e.matches);
      this.request();
    });

    this.zone.runOutsideAngular(() => {
      const onScroll = () => this.request();
      const onResize = () => {
        this.viewportH = window.innerHeight;
        this.request();
      };
      const onPointer = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        this.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
        this.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
        this.request();
      };
      this.viewportH = window.innerHeight;
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });
      window.addEventListener('pointermove', onPointer, { passive: true });
    });
  }

  register(frame: Frame, destroyRef: DestroyRef): void {
    this.frames.add(frame);
    destroyRef.onDestroy(() => this.frames.delete(frame));
    this.request();
  }

  request(): void {
    if (this.ticking || typeof window === 'undefined') return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.ticking = false;
      for (const f of this.frames) f.read();
      for (const f of this.frames) f.write();
    });
  }
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
