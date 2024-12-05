import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from 'app/modules/admin/home/home.component';
import { TenantsComponent } from './tenants/tenants.component';

export default [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'tenants',
    component: TenantsComponent,
  },
] as Routes;
