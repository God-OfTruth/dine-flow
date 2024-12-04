import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_HREF } from 'app/utils/base-url.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private api_base = inject(API_BASE_HREF);
  private _http = inject(HttpClient);
  
  constructor() { }

  getChatBySenderAndReceiver(senderId: string, receiverId: string){
    return this._http.get(`${this.api_base}api/messages/${senderId}/${receiverId}`)
  }
}
