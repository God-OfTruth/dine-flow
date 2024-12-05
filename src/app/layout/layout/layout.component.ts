import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ToolbarComponent } from 'app/components/toolbar/toolbar.component';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

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
export class LayoutComponent implements OnInit {
  @ViewChild('drawer') drawer?: MatDrawer;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  routes: Array<{
    id: string;
    name: string;
    selected: boolean;
    description: string;
    icon: string;
    uri: string;
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
      uri: '/admin',
      icon: 'home',
    },
    {
      id: 'tenants',
      name: 'Tenants',
      description: 'Tenants Registered',
      selected: false,
      uri: '/admin/tenants',
      icon: 'directions_alt',
    },
    {
      id: 'restaurants',
      name: 'Restaurants',
      description: 'Handle all Restaurants',
      selected: false,
      uri: '/admin/restaurants',
      icon: 'storefront',
    },
    {
      id: 'reports',
      name: 'Reports',
      description: 'View Reports',
      icon: 'search_insights',
      uri: '/admin/reports',
      selected: false,
    },
  ];

  ngOnInit(): void {
    this.selectedRoute = this.router.url;
    this.routes.forEach((r) => (r.selected = r.uri === this.selectedRoute));
  }

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
    uri: string;
  }) {
    this.selectedRoute = route.id;
    this.routes.forEach((r) => (r.selected = r.id === this.selectedRoute));
    this.router.navigateByUrl(route.uri);
  }
}
