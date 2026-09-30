import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

/** A post as listed; written by scripts/build-blog.mjs from content/blog/*.md. */
export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  categories: string[];
  image: string;
  imageAlt: string;
  author: string;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  html: string;
  newer: { slug: string; title: string } | null;
  older: { slug: string; title: string } | null;
}

/** A sidebar item from content/banners.yml. */
export interface Banner {
  kind: 'offer' | 'announcement' | 'figure' | 'testimonial';
  title: string;
  text: string;
  author: string;
  link: string;
  linkLabel: string;
  start: string | null;
  end: string | null;
}

/** Reads the static blog data: no server, no WordPress. */
@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly http = inject(HttpClient);
  private index$?: Observable<PostMeta[]>;

  list(): Observable<PostMeta[]> {
    return (this.index$ ??= this.http.get<PostMeta[]>('/blog-data/index.json').pipe(shareReplay(1)));
  }

  private banners$?: Observable<Banner[]>;
  banners(): Observable<Banner[]> {
    return (this.banners$ ??= this.http.get<Banner[]>('/blog-data/banners.json').pipe(shareReplay(1)));
  }

  post(slug: string): Observable<Post> {
    return this.http.get<Post>(`/blog-data/posts/${encodeURIComponent(slug)}.json`);
  }
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
