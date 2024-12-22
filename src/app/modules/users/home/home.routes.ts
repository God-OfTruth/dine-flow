import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MobileComponent } from 'app/layout/mobile/mobile.component';

export default [
  {
    path: '',
    component: MobileComponent,
  },
  {
    path: ':id',
    component: HomeComponent,
  },
] as Routes;
