import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TransactionSlip } from 'app/models/transaction.model';
import { API_BASE_HREF } from 'app/utils/base-url.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private api_base = inject(API_BASE_HREF);
  private _http = inject(HttpClient);

  saveTransaction(payload: TransactionSlip) {
    return this._http.post(`${this.api_base}api/transactions`, payload);
  }

  getAllTransactionsByFilter(
    startTime: number,
    endTime: number,
    restaurantIds: string[],
    methodTypes: string[]
  ) {
    return this._http.post<Array<any>>(
      `${this.api_base}api/transactions/filter`,
      {
        startTime: startTime,
        endTime: endTime,
        methodType: methodTypes,
        restaurants: restaurantIds,
      }
    );
  }
}
