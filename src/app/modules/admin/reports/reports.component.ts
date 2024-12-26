import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RestaurantsService } from 'app/services/restaurants.service';
import { TransactionService } from 'app/services/transaction.service';
import { Subject, takeUntil } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-reports',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatChipsModule,
  ],
  templateUrl: './reports.component.html',
})
export class ReportsComponent implements OnInit {
  private _transactionService = inject(TransactionService);
  private _restaurantService = inject(RestaurantsService);

  filterForm = new FormGroup({
    restaurant: new FormControl(),
    time: new FormControl('TODAY'),
    paymentMethod: new FormControl('CASH'),
  });
  displayedColumns: string[] = [
    'items',
    'payment_method',
    'amount',
    'transaction_date',
  ];

  private destroy$ = new Subject<void>();
  restaurants?: { key: string; value: string }[];
  timeSpanOption?: { key: string; value: string }[] = [
    {
      key: 'Today',
      value: 'TODAY',
    },
    {
      key: 'Weak',
      value: 'WEAK',
    },
    {
      key: 'Month',
      value: 'MONTH',
    },
  ];
  paymentOptions?: { key: string; value: string }[] = [
    {
      key: 'Cash',
      value: 'CASH',
    },
    {
      key: 'UPI',
      value: 'UPI',
    },
    {
      key: 'Card',
      value: 'CARD',
    },
  ];
  transactions: any[] = [];

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log('filterForm', res);
        this.getAllTransactions();
      });
    this.getAllRestaurants();
    this.getAllTransactions();
  }
  getAllRestaurants() {
    this._restaurantService.getAllRestaurants().subscribe({
      next: (res) => {
        console.log(
          'return this._http.post(`${this.api_base}api/transactions`, payload);',
          res
        );
        this.restaurants = res.map((r) => {
          return {
            key: r.name,
            value: r.id,
          };
        });
        this.filterForm.patchValue({
          restaurant: this.restaurants[0].value,
        });
      },
    });
  }
  getAllTransactions() {
    const filterVal = this.filterForm.value;
    if (filterVal.restaurant) {
      this._transactionService
        .getAllTransactionsByRestaurant(filterVal.restaurant)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            console.log(
              ' this._transactionService.getAllTransactionsByRestaurant()',
              res
            );
            this.transactions = res;
          },
        });
    }
    // this._transactionService.getAllTransactionsByRestaurant()
  }

  getTotalAmount() {
    return this.transactions
      .map((t) => t.finalPrice.amount)
      .reduce((acc, value) => acc + value, 0);
  }
}
