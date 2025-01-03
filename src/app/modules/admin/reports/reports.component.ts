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
import { DateTime } from 'luxon';

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
  timeZone = 'Asia/Kolkata';
  filterForm = new FormGroup({
    restaurant: new FormControl([]),
    time: new FormControl(),
    paymentMethod: new FormControl([]),
  });
  displayedColumns: string[] = [
    'items',
    'payment_method',
    'amount',
    'transaction_date',
  ];

  private destroy$ = new Subject<void>();
  restaurants?: { key: string; value: string }[];
  timeSpanOption?: {
    key: string;
    value: {
      start: number;
      end: number;
    };
  }[] = [];
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
    this.timeSpanOption = [
      {
        key: 'Today',
        value: {
          start: DateTime.now()
            .startOf('day')
            .setZone(this.timeZone)
            .toMillis(),
          end: DateTime.now().endOf('day').setZone(this.timeZone).toMillis(),
        },
      },
      {
        key: 'Weak',
        value: {
          start: DateTime.now()
            .startOf('week')
            .setZone(this.timeZone)
            .toMillis(),
          end: DateTime.now().endOf('week').setZone(this.timeZone).toMillis(),
        },
      },
      {
        key: 'Month',
        value: {
          start: DateTime.now()
            .startOf('month')
            .setZone(this.timeZone)
            .toMillis(),
          end: DateTime.now().endOf('month').setZone(this.timeZone).toMillis(),
        },
      },
    ];
    this.filterForm.patchValue({
      time: this.timeSpanOption[0].value,
    });
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
        this.restaurants = res.map((r) => {
          return {
            key: r.name,
            value: r.id,
          };
        });
      },
    });
  }
  getAllTransactions() {
    const filterVal = this.filterForm.value;
    if (filterVal) {
      this._transactionService
        .getAllTransactionsByFilter(
          filterVal.time?.start ?? null,
          filterVal.time?.end ?? null,
          filterVal.restaurant ?? [],
          filterVal.paymentMethod ?? []
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.transactions = res;
          },
        });
    }
  }

  getTotalAmount() {
    return this.transactions
      .map((t) => t.finalPrice.amount)
      .reduce((acc, value) => acc + value, 0);
  }
}
