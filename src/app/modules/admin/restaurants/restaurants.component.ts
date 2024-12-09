import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RestaurantsService } from 'app/services/restaurants.service';
import { Subject, takeUntil } from 'rxjs';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { Restaurant } from 'app/models/restaurant.model';

@Component({
  selector: 'app-restaurants',
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './restaurants.component.html',
})
export class RestaurantsComponent {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _restaurantService = inject(RestaurantsService);
  private dialog = inject(MatDialog);
  dataSource: Array<any> = [];

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.getAllRestaurants();
  }
  getAllRestaurants() {
    this._restaurantService
      .getAllRestaurants()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (res) => {
          console.log('_restaurantService', res);
          this.dataSource = res;
        },
      });
  }

  onCreateRestaurant() {
    this.dialog
      .open(RestaurantComponent, {
        hasBackdrop: true,
        backdropClass: 'backdrop-class',
        disableClose: true,
        // height: '80%',
        width: '80%',
      })
      .afterClosed()
      .subscribe({
        next: (res) => {
          console.log('onCreateRestaurant()', res);
          this.getAllRestaurants();
        },
      });
  }

  onViewRestaurant(restaurant: Restaurant) {
    this.dialog
      .open(RestaurantComponent, {
        hasBackdrop: true,
        backdropClass: 'backdrop-class',
        disableClose: true,
        data: restaurant,
        // height: '80%',
        width: '80%',
      })
      .afterClosed()
      .subscribe({
        next: (res) => {
          console.log('onCreateRestaurant()', res);
          this.getAllRestaurants();
        },
      });
  }
}
