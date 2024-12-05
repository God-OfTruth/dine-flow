import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from 'app/modules/admin/home/home.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ReportsComponent } from './reports/reports.component';

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
  {
    path: 'restaurants',
    component: RestaurantsComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
] as Routes;
