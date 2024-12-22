import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ToolbarComponent } from 'app/components/toolbar/toolbar.component';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RestaurantsService } from 'app/services/restaurants.service';
import { Subject, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-mobile',
  imports: [
    CommonModule,
    ToolbarComponent,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
    MatCardModule,
  ],
  templateUrl: './mobile.component.html',
})
export class MobileComponent implements OnInit {
  private router = inject(Router);
  @ViewChild('drawer') drawer?: MatDrawer;
  private activatedRoute = inject(ActivatedRoute);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _restaurantService = inject(RestaurantsService);
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
    // {
    //   id: 'home',
    //   name: 'Home',
    //   description: 'Home page',
    //   selected: true,
    //   uri: '/home',
    //   icon: 'home',
    // },
    {
      id: 'transactions',
      name: 'Transactions',
      description: 'Total Transactions',
      selected: false,
      uri: '/transactions',
      icon: 'receipt_long',
    },
  ];
  restaurants?: any[];

  ngOnInit(): void {
    this.selectedRoute = this.router.url;
    this.routes.forEach((r) => (r.selected = r.uri === this.selectedRoute));
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this._restaurantService
      .getAllRestaurants()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (res) => {
          this.restaurants = res;
          console.log('restaurants', this.restaurants);
          this.routes = res.map((restaurant) => {
            return {
              id: restaurant.id,
              name: restaurant.name,
              selected: false,
              uri: `/home/${restaurant.id}`,
              description: restaurant.name,
              icon: 'restaurant',
            };
          });
          console.log('restaurants', this.routes);
        },
      });
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

  routeRestaurant(item: any) {
    this.router.navigateByUrl(`/home/${item.id}`);
  }
}
