import { Routes } from '@angular/router';

// Page titles and descriptions are set per page by SeoService.
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home') },
  // the old WordPress addresses, kept so search rankings carry over
  { path: 'about-us', loadComponent: () => import('./pages/about/about') },
  { path: 'services', loadComponent: () => import('./pages/services/services') },
  { path: 'surgeries', loadComponent: () => import('./pages/surgeries/surgeries') },
  { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery') },
  { path: 'faq', loadComponent: () => import('./pages/faq/faq') },
  { path: 'contact-us', loadComponent: () => import('./pages/contact/contact') },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog-list') },
  { path: 'blog/:slug', loadComponent: () => import('./pages/blog/blog-post') },
  { path: 'about', redirectTo: 'about-us' },
  { path: 'gallery-2', redirectTo: 'gallery' },
  { path: 'contact', redirectTo: 'contact-us' },
  { path: '**', redirectTo: '' },
];
