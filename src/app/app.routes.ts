import { Routes } from '@angular/router';
import { MobileComponent } from './layout/mobile/mobile.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: MobileComponent
    }
];
