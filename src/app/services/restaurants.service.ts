import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Restaurant } from 'app/models/restaurant.model';
import { API_BASE_HREF } from 'app/utils/base-url.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private api_base = inject(API_BASE_HREF);
  private _http = inject(HttpClient);

  getAllRestaurants() {
    return this._http.get<any[]>(`${this.api_base}api/restaurants`);
  }

  createRestaurant(restaurant: Restaurant) {
    return this._http.post(`${this.api_base}api/restaurants`, restaurant);
  }
}
