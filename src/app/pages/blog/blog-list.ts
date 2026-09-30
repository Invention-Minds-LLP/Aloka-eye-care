import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SeoService, breadcrumbs } from '../../core/seo.service';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { LEA_SHAPES, Lea, LeaShape } from '../../shared/lea';
import { RevealDirective } from '../../shared/reveal.directive';
import { SiteFooter } from '../../shared/site-footer';
import { Child, Doctor } from '../home/story/people';
import { BlogService, formatDate } from './blog.service';
import { PageBar } from './page-bar';

/** The chart board's rows, largest first, like the Lea chart in the clinic. */
const CHART: LeaShape[][] = [
  ['house', 'apple'],
  ['circle', 'square', 'house'],
  ['apple', 'circle', 'square', 'apple'],
  ['square', 'house', 'apple', 'circle', 'house'],
  ['circle', 'apple', 'house', 'square', 'circle', 'apple'],
];

@Component({
  selector: 'app-blog-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageBar, SiteFooter, RouterLink, RevealDirective, Lea, Child, Doctor],
  template: `
    <app-page-bar />
    <main class="blog" id="main">
      <!-- The reading room: an eye chart coming into focus, Dr. Aloka pointing, a child reading. -->
      <section class="hero" aria-labelledby="blog-title">
        <div class="wrap hero__grid">
          <div class="hero__copy">
            <h1 id="blog-title">Eye care, explained for parents</h1>
            <p class="hero__lede">
              Short, clear articles by Dr. Aloka Hedau on children's eyes, squint, myopia and when to get your child's eyes checked.
            </p>
            @if (posts(); as all) {
              <p class="hero__count">{{ all.length }} articles · written for families, not textbooks</p>
            }
          </div>

          <div class="scene" aria-hidden="true">
            <div class="chart">
              @for (row of chart; track $index; let r = $index) {
                <div class="chart__row" [style.--r]="r" [style.--size]="rowSize(r)">
                  @for (s of row; track $index) {
                    <app-lea [shape]="s" />
                  }
                </div>
              }
              <span class="chart__line"></span>
            </div>
            <app-doctor class="scene__doctor" mood="smile" arm="point" />
            <app-child class="scene__child" mood="joy" arm="book" [glasses]="true" [squint]="0" />
          </div>
        </div>
      </section>

      <div class="wrap">
        @if (posts() === undefined) {
          <p class="blog__state" role="status">Loading articles…</p>
        } @else if (posts() === null) {
          <p class="blog__state" role="alert">The articles couldn't be loaded. Please refresh the page.</p>
        } @else {
          @if (categories().length > 1) {
            <div class="filters" role="group" aria-label="Filter by topic">
              <button type="button" [class.is-on]="!topic()" [attr.aria-pressed]="!topic()" (click)="topic.set(null)">All topics</button>
              @for (c of categories(); track c; let i = $index) {
                <button type="button" [class.is-on]="topic() === c" [attr.aria-pressed]="topic() === c" (click)="topic.set(c)">
                  <app-lea [shape]="shapeFor(c)" />{{ c }}
                </button>
              }
            </div>
          }

          @if (shown(); as list) {
            @if (list.length === 0) {
              <p class="blog__state">No articles in this topic yet.</p>
            }
            <ol class="posts">
              @for (p of list; track p.slug; let first = $first) {
                <li class="post" [class.post--lead]="first && !topic()" appReveal>
                  <a class="post__link" [routerLink]="['/blog', p.slug]">
                    <span class="post__img">
                      @if (p.image) {
                        <img [src]="p.image" [alt]="p.imageAlt" loading="lazy" decoding="async" />
                      }
                      @if (p.categories[0]; as c) {
                        <span class="post__stamp"><app-lea [shape]="shapeFor(c)" />{{ c }}</span>
                      }
                    </span>
                    <span class="post__body">
                      <span class="post__meta">{{ date(p.date) }} · {{ p.readingMinutes }} min read</span>
                      <span class="post__title">{{ p.title }}</span>
                      <span class="post__desc">{{ p.description }}</span>
                      <span class="post__more">Read the article <span aria-hidden="true">→</span></span>
                    </span>
                  </a>
                </li>
              }
            </ol>
          }
        }
      </div>
    </main>
    <app-site-footer />
  `,
  styleUrl: './blog-list.scss',
})
export default class BlogList {
  private readonly blog = inject(BlogService);
  /** undefined while loading, null on error. */
  protected readonly posts = toSignal(this.blog.list().pipe(catchError(() => of(null))));
  protected readonly topic = signal<string | null>(null);
  protected readonly categories = computed(() => [...new Set((this.posts() ?? []).flatMap((p) => p.categories))].sort());
  protected readonly shown = computed(() => {
    const t = this.topic();
    const all = this.posts() ?? [];
    return t ? all.filter((p) => p.categories.includes(t)) : all;
  });
  protected readonly date = formatDate;
  protected readonly chart = CHART;

  /** Each topic keeps the same symbol wherever it appears. */
  protected shapeFor(topic: string): LeaShape {
    const i = this.categories().indexOf(topic);
    return LEA_SHAPES[(i < 0 ? 0 : i) % LEA_SHAPES.length];
  }
  protected rowSize(r: number): string {
    return `calc(var(--chart) * ${[0.2, 0.15, 0.11, 0.085, 0.065][r]})`;
  }

  constructor() {
    inject(SeoService).set({
      title: "Children's Eye Health Blog | Dr. Aloka's Eye Care, Kukatpally, Hyderabad",
      description:
        'Articles by paediatric ophthalmologist Dr. Aloka Hedau on children’s eyes, squint, myopia and when to get your child’s eyes checked, from Kukatpally, Hyderabad.',
      path: '/blog/',
      jsonLd: [breadcrumbs(['Blog', '/blog/'])],
    });
  }
}
