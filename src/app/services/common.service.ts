import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum MessageIds {
  SNACKBAR = 'SNACKBAR',
}

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private messageSource = new BehaviorSubject<{
    id: MessageIds;
    data: any;
  } | null>(null);
  currentMessage$ = this.messageSource.asObservable();

  changeMessage(message: { id: MessageIds; data: any }) {
    this.messageSource.next(message);
  }
}
