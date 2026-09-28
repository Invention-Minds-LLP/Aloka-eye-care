import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home'),
    title: "Dr. Aloka's Eye Care | Paediatric Ophthalmologist & Squint Surgeon, Kukatpally, Hyderabad",
  },
  { path: '**', redirectTo: '' },
];
