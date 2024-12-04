import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_HREF } from 'app/utils/base-url.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private api_base = inject(API_BASE_HREF);
  private _http = inject(HttpClient);
  constructor() {}

  getProfileById(id: string){
    return this._http.get<any>(`${this.api_base}api/profile/${id}`)
  }

  getUsersByIds(ids: Array<string>){
    return this._http.post<Array<any>>(`${this.api_base}api/users/ids`, ids)
  }
}
