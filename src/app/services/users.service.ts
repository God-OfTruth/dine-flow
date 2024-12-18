import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_HREF } from 'app/utils/base-url.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private api_base = inject(API_BASE_HREF);
  private _http = inject(HttpClient);

  getAllUsers() {
    return this._http.get<any[]>(`${this.api_base}api/users`);
  }

  createTenant(user: {
    username: string;
    mobileNumber: string;
    email: string;
  }) {
    return this._http.post(`${this.api_base}api/users/owner`, user);
  }

  updateUserStatus(userId: string, status: boolean) {
    return this._http.post(
      `${this.api_base}api/users/activate/${userId}/${status}`,
      null
    );
  }
}
