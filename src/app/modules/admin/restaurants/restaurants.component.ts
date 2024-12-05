import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RestaurantsService } from 'app/services/restaurants.service';
import { Subject, takeUntil } from 'rxjs';

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
}
