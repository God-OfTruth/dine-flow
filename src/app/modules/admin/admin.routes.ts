import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from 'app/modules/admin/home/home.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ReportsComponent } from './reports/reports.component';
import { MenusComponent } from './menus/menus.component';

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
    path: 'menus',
    component: MenusComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
] as Routes;
