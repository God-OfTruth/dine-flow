import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Menu } from 'app/models/menu.model';
import { API_BASE_HREF } from 'app/utils/base-url.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private api_base = inject(API_BASE_HREF);
  private _http = inject(HttpClient);

  getAllMenus() {
    return this._http.get<any[]>(`${this.api_base}api/menus`);
  }

  createNewMenu(menu: Menu) {
    return this._http.post(`${this.api_base}api/menus`, menu);
  }
}
