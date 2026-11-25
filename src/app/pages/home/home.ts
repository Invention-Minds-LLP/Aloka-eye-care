import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { MobileBookBar } from '../../shared/mobile-book-bar';
import { ParallaxDirective } from '../../shared/parallax.directive';
import { Rings } from '../../shared/rings';
import { SiteFooter } from '../../shared/site-footer';
import { PageBar } from '../blog/page-bar';
import { CLINIC } from './home.content';

const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/**
 * The home page (Clinic Light, 2026-11-25), ported from public/design-options/14-clinic-light.html.
 * Hero: the doctor video, scrubbed by the scroll and playing on its own when the visitor stops scrolling.
 * Styles live in src/home-clinic.scss, scoped under .cl-home.
 */
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageBar, SiteFooter, MobileBookBar, RouterLink, Rings, ParallaxDirective],
  templateUrl: './home.html',
})
export default class Home {
  protected readonly clinic = CLINIC;
  protected readonly mapSrc = inject(DomSanitizer).bypassSecurityTrustResourceUrl(CLINIC.mapsEmbed);
  /** Motion is allowed (set before first paint in index.html); the reduced-motion page stays still. */
  protected readonly motion = typeof document !== 'undefined' && document.documentElement.classList.contains('motion-ok');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    inject(SeoService).set({
      title: "Paediatric Ophthalmologist & Squint Surgeon in Kukatpally, Hyderabad | Dr. Aloka's Eye Care",
      description:
        'Children’s eye specialist Dr. Aloka Hedau in KPHB, Kukatpally, Hyderabad: squint surgery for children & adults, myopia clinic, vision therapy, paediatric cataract. Mon–Sat, 10–5. Call +91 74164 27503.',
      path: '/',
    });
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => destroyRef.onDestroy(this.start()));
  }

  /** Wires up the page's behaviour; returns the clean-up. */
  private start(): () => void {
    const root = this.host;
    const $ = <T extends Element = HTMLElement>(s: string) => root.querySelector(s) as T;
    const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(root.querySelectorAll(s)) as T[];
    const motion = this.motion;
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups: (() => void)[] = [];
    const on = (t: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions) => {
      t.addEventListener(type, fn, opts);
      cleanups.push(() => t.removeEventListener(type, fn, opts));
    };
    const observe = (io: IntersectionObserver) => cleanups.push(() => io.disconnect());
    let VH = innerHeight;
    let VW = innerWidth;

    /* clinic timings */
    const tb = $('#timesBtn');
    const tp = $('#times');
    on(tb, 'click', () => {
      const o = tp.hidden;
      tp.hidden = !o;
      tb.setAttribute('aria-expanded', String(o));
      tb.textContent = o ? 'Hide clinic timings' : 'View clinic timings';
    });

    /* reveals: things rise into place in 3D as they arrive */
    const io = new IntersectionObserver(
      (en) =>
        en.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    );
    observe(io);
    [...$$('.rv'), ...$$('.fac__tile')].forEach((el) => io.observe(el));

    /* facilities: the four labels take you to their photo; on its own it tours them one by one */
    const fac = $('#fac');
    const facTabs = $$<HTMLButtonElement>('#facTabs button');
    const facTiles: Record<string, HTMLElement> = {};
    $$('.fac__tile').forEach((t) => (facTiles[t.dataset['k']!] = t));
    let facCur = -1;
    let facStart = 0;
    let facHold = false;
    let facIn = false;
    let facRaf = 0;
    const zoomOf = (t: HTMLElement) => t.querySelector('.fac__zoom') as HTMLElement;
    const facSet = (i: number) => {
      facCur = i;
      facStart = performance.now();
      const b = facTabs[i];
      const t = facTiles[b.dataset['tile']!];
      facTabs.forEach((x, k) => {
        x.setAttribute('aria-pressed', String(k === i));
        x.style.setProperty('--t', motion ? '0' : '1');
      });
      Object.values(facTiles).forEach((x) => {
        x.classList.toggle('on', x === t);
        if (x !== t) zoomOf(x).style.setProperty('--s', '1');
      });
      zoomOf(t).style.setProperty('--o', b.dataset['o']!);
      zoomOf(t).style.setProperty('--s', b.dataset['s']!);
      fac.classList.add('touring');
    };
    facTabs.forEach((b, i) => {
      on(b, 'click', () => facSet(i));
      if (fine) on(b, 'pointerenter', () => facSet(i));
    });
    [fac, $('#facTabs')].forEach((el) => {
      on(el, 'pointerenter', () => (facHold = true));
      on(el, 'pointerleave', () => {
        facHold = false;
        facStart = performance.now();
      });
    });
    const facTick = (now: number) => {
      facRaf = 0;
      if (!facIn) return;
      if (facCur < 0) facSet(0);
      const DUR = 3400;
      let t = (now - facStart) / DUR;
      if (facHold) {
        t = Math.min(t, 0.999);
        facStart = now - t * DUR;
      }
      facTabs[facCur].style.setProperty('--t', clamp(t).toFixed(3));
      if (t >= 1) facSet((facCur + 1) % facTabs.length);
      facRaf = requestAnimationFrame(facTick);
    };
    if (motion) {
      const fio = new IntersectionObserver(
        (en) => {
          const was = facIn;
          facIn = en[0].isIntersecting;
          if (facIn && !was) {
            facStart = performance.now() + 900;
            facRaf = requestAnimationFrame(facTick);
          }
          if (!facIn && was) {
            fac.classList.remove('touring');
            Object.values(facTiles).forEach((x) => {
              x.classList.remove('on');
              zoomOf(x).style.setProperty('--s', '1');
            });
            facCur = -1;
          }
        },
        { threshold: 0.35 },
      );
      fio.observe(fac);
      observe(fio);
    }
    cleanups.push(() => cancelAnimationFrame(facRaf));

    if (!motion) return () => cleanups.forEach((c) => c());

    /* the training path lights up step by step */
    const pathLis = $$('.path li');
    let pathI = -1;
    let pathT: ReturnType<typeof setInterval> | 0 = 0;
    const pio = new IntersectionObserver(
      (en) => {
        if (en[0].isIntersecting && !pathT)
          pathT = setInterval(() => {
            pathI = (pathI + 1) % (pathLis.length + 2);
            pathLis.forEach((li, k) => li.classList.toggle('on', k <= pathI && pathI < pathLis.length + 1));
          }, 900);
        if (!en[0].isIntersecting && pathT) {
          clearInterval(pathT);
          pathT = 0;
        }
      },
      { threshold: 0.4 },
    );
    pio.observe($('.path'));
    observe(pio);
    cleanups.push(() => pathT && clearInterval(pathT));

    /* service cards lean toward the pointer */
    if (fine)
      $$('.card').forEach((c) => {
        on(c, 'pointermove', ((e: PointerEvent) => {
          const r = c.getBoundingClientRect();
          c.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 10).toFixed(2) + 'deg');
          c.style.setProperty('--rx', (-((e.clientY - r.top) / r.height - 0.5) * 8).toFixed(2) + 'deg');
        }) as EventListener);
        on(c, 'pointerleave', () => {
          c.style.setProperty('--rx', '0deg');
          c.style.setProperty('--ry', '0deg');
        });
      });

    /* hero video: frames in images/hero-light/seq/ (0001.webp ...), drawn on a canvas by scroll position;
       when the visitor stops scrolling she plays on her own (smile, turn to the slit lamp, hold, turn back) */
    const seq = $<HTMLCanvasElement>('#seq');
    const poster = $('#poster');
    const stage = $('#stage');
    const heroSpace = $('.hero__space');
    let seqCtx: CanvasRenderingContext2D | null = null;
    let seqFrames: HTMLImageElement[] = [];
    let seqLast = -1;
    let alive = true;
    cleanups.push(() => (alive = false));
    fetch('images/hero-light/seq/manifest.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((m: { count: number; w: number; h: number; ext?: string } | null) => {
        if (!alive || !m?.count) return;
        for (let i = 1; i <= m.count; i++) {
          const im = new Image();
          im.decoding = 'async';
          im.src = `images/hero-light/seq/${String(i).padStart(4, '0')}.${m.ext ?? 'webp'}`;
          seqFrames.push(im);
        }
        seq.width = m.w;
        seq.height = m.h;
        seqCtx = seq.getContext('2d');
        seqFrames[0].onload = () => {
          seqLast = -1;
          kick();
        };
      })
      .catch(() => {});
    const drawSeq = (p: number) => {
      if (!seqCtx) return;
      const n = seqFrames.length;
      let i = Math.round(clamp(p) * (n - 1));
      for (let d = 0; d < n; d++) {
        const j = i - d;
        if (j >= 0 && seqFrames[j].complete && seqFrames[j].naturalWidth) {
          i = j;
          break;
        }
      }
      if (i === seqLast) return;
      seqLast = i;
      seqCtx.drawImage(seqFrames[i], 0, 0, seq.width, seq.height);
    };
    let dp = 0;
    let dT = 0;
    let autoStart = 0;
    let lastScroll = performance.now();

    /* photos drift a little inside their frames */
    const iPars = $$('[data-ipar]');

    let raf = 0;
    let last = 0;
    const frame = (now: number) => {
      raf = 0;
      const f = last ? clamp((now - last) / 16.67, 0.25, 4) : 1;
      last = now;
      let moving = false;
      const sr = stage.getBoundingClientRect();
      if (sr.bottom > 0 && sr.top < VH) {
        const spaceH = heroSpace.offsetHeight;
        const scrollT = clamp(window.pageYOffset / (spaceH > 50 ? spaceH * 0.9 : VH * 0.5));
        if (now - lastScroll > 1800) {
          /* slow loop: smile 2.5s, turn to the slit lamp 4s, hold 3s, turn back 4s, pause 1s */
          if (!autoStart) autoStart = now - (dp > 0.5 ? 6500 : 0);
          const ph = (now - autoStart) % 14500;
          dT = ph < 2500 ? 0 : ph < 6500 ? ease((ph - 2500) / 4000) : ph < 9500 ? 1 : ph < 13500 ? 1 - ease((ph - 9500) / 4000) : 0;
        } else {
          autoStart = 0;
          dT = scrollT;
        }
        moving = true; /* keep ticking while the hero is on screen, so autoplay can start */
        dp += (dT - dp) * (1 - Math.pow(1 - 0.14, f));
        const zoom = `scale(${(1 + 0.05 * dp).toFixed(4)})`;
        seq.style.transform = zoom;
        poster.style.transform = zoom;
        drawSeq(dp);
      }
      iPars.forEach((im) => {
        const r = im.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > VH) return;
        im.style.transform = `translate3d(0,${(clamp((r.top + r.height / 2 - VH / 2) / VH, -1, 1) * -6).toFixed(2)}%,0)`;
      });
      if (moving) raf = requestAnimationFrame(frame);
      else last = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    on(window, 'scroll', () => {
      lastScroll = performance.now();
      kick();
    }, { passive: true });
    on(window, 'resize', () => {
      if (innerWidth !== VW || Math.abs(innerHeight - VH) > 140) VH = innerHeight;
      VW = innerWidth;
      kick();
    });
    kick();
    cleanups.push(() => cancelAnimationFrame(raf));

    return () => cleanups.forEach((c) => c());
  }
}
