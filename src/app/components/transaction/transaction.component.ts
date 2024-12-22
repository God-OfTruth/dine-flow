import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from 'app/services/transaction.service';
import { MatRadioModule } from '@angular/material/radio';
import { Item } from 'app/models/items.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-transaction',
  imports: [
    CommonModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './transaction.component.html',
})
export class TransactionComponent {
  public data: any = inject(MAT_DIALOG_DATA);
  private _dialogRef = inject(MatDialogRef<TransactionComponent>);
  private _transactionService = inject(TransactionService);
  transactionForm = new FormGroup({
    id: new FormControl(),
    items: new FormControl<Item[]>([], [Validators.required]),
    methodType: new FormControl('CASH', [Validators.required]),
    finalPrice: new FormGroup({
      amount: new FormControl(null, [Validators.required]),
      discount: new FormControl(),
    }),
    userMobileNumber: new FormControl(),
    userId: new FormControl(),
    restaurantId: new FormControl(null, [Validators.required]),
    comment: new FormControl(),
    tags: new FormControl(),
  });
  ngOnInit(): void {
    console.log('data', this.data);
    this.transactionForm.patchValue(this.data);
    console.log('val.finalPrice?.amount,', this.transactionForm.value);
  }

  onSave() {
    if (this.transactionForm.valid) {
      const val = this.transactionForm.value;
      this._transactionService
        .saveTransaction({
          items: val.items ?? [],
          finalPrice: {
            amount: val.finalPrice?.amount ?? 0,
            discount: val.finalPrice?.discount,
          },
          methodType: val.methodType ?? 'CASH',
          restaurantId: val.restaurantId ?? '',
          comment: val.comment,
          id: val.id,
          tags: val.tags,
          userId: val.userId,
          userMobileNumber: val.userMobileNumber,
        })
        .subscribe({
          next: (res) => {
            console.log('transaction', res);
            this._dialogRef.close();
          },
        });
    }
  }
}
