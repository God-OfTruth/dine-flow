import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent } from 'app/components/toolbar/toolbar.component';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    ToolbarComponent,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  @ViewChild('drawer') drawer?: MatDrawer;
  routes: Array<{
    id: string;
    name: string;
    selected: boolean;
    description: string;
    icon: string;
    children?: {
      name: string;
      selected: boolean;
      description: string;
      icon: string;
    }[];
  }> = [
    {
      id: 'home',
      name: 'Home',
      description: 'Home page',
      selected: true,
      icon: 'home',
    },
    {
      id: 'tenants',
      name: 'Tenants',
      description: 'Tenants Registered',
      selected: false,
      icon: 'directions_alt',
    },
    {
      id: 'restaurants',
      name: 'Restaurants',
      description: 'Handle all Restaurants',
      selected: false,
      icon: 'storefront',
    },
    {
      id: 'menus',
      name: 'Menu',
      description: 'Handle Menu',
      icon: 'menu_book',
      selected: false,
    },
    {
      id: 'reports',
      name: 'Reports',
      description: 'View Reports',
      icon: 'search_insights',
      selected: false,
    },
  ];

  selectedRoute: string = this.routes[0].id;
  onMenuClick() {
    if (!this.drawer?.opened) {
      this.drawer?.open();
    } else {
      this.drawer?.close();
    }
  }

  onRouteSelection(route: {
    id: string;
    name: string;
    selected: boolean;
    description: string;
    icon: string;
  }) {
    this.selectedRoute = route.id;
  }
}
