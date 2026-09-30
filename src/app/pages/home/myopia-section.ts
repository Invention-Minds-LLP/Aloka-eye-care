import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { CLINIC } from './home.content';

/** Signs and risks parents can recognise. From the clinic's myopia articles; a prompt for a check, not a diagnosis. */
const CHECKS = [
  'Squeezes or squints to see the board, TV or faraway things',
  'Holds books or phones very close',
  'Complains of headaches or eye strain',
  'One or both parents wear glasses for distance',
  'Spends less than 90 minutes a day playing outdoors',
  'Already wears glasses, and the power keeps going up',
];

/**
 * Myopia clinic, in parents' terms: what a child with myopia sees from the desk (board blurred,
 * book clear), and the same view with the right glasses.
 */
@Component({
  selector: 'app-myopia-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RevealDirective, RouterLink],
  template: `
    <section class="myo" id="myopia" aria-labelledby="myopia-title">
      <div class="wrap">
        <div class="myo__head">
          <h2 id="myopia-title" appReveal>Myopia clinic</h2>
          <p class="myo__lede" appReveal style="--delay: 0.1s">
            With more screen time and less outdoor play, myopia (short-sightedness) is common in children today. It can keep getting worse until 18–20 years
            of age, and high myopia raises the risk of retinal problems in adult life. The earlier it's caught, the more can be done to
            slow it.
          </p>
        </div>

        <div class="myo__grid">
          <!-- What a child with myopia sees from the classroom desk: the board blurred, the book clear -->
          <figure class="view" [class.is-sharp]="glasses()">
            <div class="view__frame" aria-hidden="true">
              <svg viewBox="0 0 520 330" focusable="false">
                <!-- classroom wall -->
                <rect width="520" height="330" fill="#e9dfcf" />
                <rect y="232" width="520" height="98" fill="#b98a5e" />
                <!-- far away: the board, clock and chart (these blur) -->
                <g class="view__far">
                  <rect x="60" y="28" width="330" height="170" rx="6" fill="#2f4a3a" stroke="#8a6440" stroke-width="10" />
                  <text x="90" y="82" class="chalk">2 + 3 = 5</text>
                  <text x="90" y="128" class="chalk">A  B  C  D  E</text>
                  <text x="90" y="170" class="chalk chalk--sm">Today: my eyes</text>
                  <circle cx="450" cy="62" r="30" fill="#fbf8f2" stroke="#1b2a3a" stroke-width="4" />
                  <path d="M450 62 V42 M450 62 L464 70" stroke="#1b2a3a" stroke-width="4" stroke-linecap="round" />
                  <rect x="420" y="112" width="62" height="86" rx="4" fill="#fbf8f2" />
                  <path d="M432 132 H470 M432 148 H466 M432 164 H470 M432 180 H460" stroke="#e8792f" stroke-width="5" stroke-linecap="round" />
                </g>
                <!-- close up: the open book on the desk (always clear) -->
                <g class="view__near">
                  <path d="M260 262 L130 244 L118 330 L260 330 Z" fill="#fbf8f2" />
                  <path d="M260 262 L390 244 L402 330 L260 330 Z" fill="#f3ecdf" />
                  <path d="M260 262 V330" stroke="#c9bfae" stroke-width="3" />
                  <path d="M150 272 H240 M148 288 H236 M146 304 H240 M280 272 H370 M284 288 H372 M288 304 H368" stroke="#9aa6b2" stroke-width="4" stroke-linecap="round" />
                </g>
              </svg>
              <span class="view__tag view__tag--far">Far away</span>
              <span class="view__tag view__tag--near">Close up</span>
            </div>

            <div class="view__switch" role="group" aria-label="How your child sees">
              <button type="button" [class.is-on]="!glasses()" [attr.aria-pressed]="!glasses()" (click)="glasses.set(false)">With myopia</button>
              <button type="button" [class.is-on]="glasses()" [attr.aria-pressed]="glasses()" (click)="glasses.set(true)">With the right glasses</button>
            </div>
            <figcaption aria-live="polite">
              @if (glasses()) {
                <strong>Everything is clear again,</strong> near and far. Myopia control can also slow how fast the power increases.
              } @else {
                <strong>The book is clear, but the board is blurred.</strong> That's myopia: faraway things look fuzzy, so children squint,
                move closer, or quietly fall behind in class.
              }
            </figcaption>
          </figure>

          <div class="myo__body">
            <h3>What the myopia clinic does</h3>
            <ul class="does">
              <li><strong>Measures, every visit.</strong> Your child's glasses power and how fast the eye is growing, so any change is caught early.</li>
              <li><strong>Looks at daily life.</strong> Lifestyle, screen time and diet, with practical changes for the family.</li>
              <li><strong>Slows it down.</strong> Special eye drops and special glasses that help stop the power going up, where they are right for your child.</li>
            </ul>

            <h3>Habits that help at home</h3>
            <ul class="habits">
              <li><span class="habit__big">90 min</span><span>outdoor play in daylight, every day</span></li>
              <li><span class="habit__big">20-20-20</span><span>every 20 minutes, look 20 feet away for 20 seconds</span></li>
              <li><span class="habit__big">30 cm+</span><span>keep books and screens at least 30 cm from the eyes</span></li>
            </ul>
          </div>
        </div>

        <!-- a quick checklist for parents -->
        <div class="check" appReveal>
          <div class="check__intro">
            <h3>Should my child have a myopia check?</h3>
            <p>Tick anything that sounds like your child.</p>
          </div>
          <ul class="check__list">
            @for (c of checks; track c; let i = $index) {
              <li>
                <label>
                  <input type="checkbox" [checked]="ticked()[i]" (change)="toggle(i)" />
                  <span class="check__box" aria-hidden="true"></span>
                  <span>{{ c }}</span>
                </label>
              </li>
            }
          </ul>
          <div class="check__result" aria-live="polite">
            @if (count() === 0) {
              <p>Even with no signs, children should have an eye check every year.</p>
            } @else if (count() < 3) {
              <p><strong>A check is a good idea.</strong> {{ count() }} {{ count() === 1 ? 'sign' : 'signs' }} can be worth looking into at your child's next eye test.</p>
            } @else {
              <p><strong>Please book a myopia check soon.</strong> Several of these together are worth having examined.</p>
            }
            <p class="check__note">This isn't a diagnosis. Only an eye examination can tell.</p>
            <div class="check__actions">
              <a class="btn-book" [href]="clinic.bookingHref" target="_blank" rel="noopener">Book a myopia check <app-icon name="arrow" /></a>
              <a class="check__read" routerLink="/blog/can-we-reverse-or-stop-myopia-in-our-child">Read: can we stop myopia?</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './myopia-section.scss',
})
export class MyopiaSection {
  protected readonly clinic = CLINIC;
  protected readonly checks = CHECKS;
  protected readonly ticked = signal(CHECKS.map(() => false));
  protected readonly count = computed(() => this.ticked().filter(Boolean).length);
  /** The before/after switch: starts on "With myopia", flips on its own once when first seen. */
  protected readonly glasses = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      let timer = 0;
      const io = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          // show the blur for a moment, then put the glasses on, unless the parent already tapped
          timer = window.setTimeout(() => this.glasses.set(true), 2600);
          host.querySelector('.view__switch')?.addEventListener('click', () => clearTimeout(timer), { once: true });
        },
        { threshold: 0.6 },
      );
      const view = host.querySelector('.view');
      if (view) io.observe(view);
      destroyRef.onDestroy(() => {
        io.disconnect();
        clearTimeout(timer);
      });
    });
  }

  protected toggle(i: number): void {
    this.ticked.update((t) => t.map((v, j) => (j === i ? !v : v)));
  }
}
