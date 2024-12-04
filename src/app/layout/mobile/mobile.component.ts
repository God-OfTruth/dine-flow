import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BottomPanelComponent } from 'app/components/bottom-panel/bottom-panel.component';
import { ToolbarComponent } from 'app/components/toolbar/toolbar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ItemsListComponent } from 'app/components/items-list/items-list.component';
import { MatDividerModule } from '@angular/material/divider';

interface Transaction {
  id: string;
  item: string;
  quantity: number;
  cost: number;
}
@Component({
  selector: 'app-mobile',
  imports: [
    CommonModule,
    ToolbarComponent,
    BottomPanelComponent,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
  ],
  templateUrl: './mobile.component.html',
})
export class MobileComponent {
  private dialog = inject(MatDialog);
  displayedColumns: string[] = ['item', 'quantity', 'cost'];
  transactions: Transaction[] = [
    { id: '132', item: 'Beach ball', quantity: 1, cost: 4 },
    { id: '1322', item: 'Towel', quantity: 1, cost: 5 },
    { id: '1323', item: 'Frisbee', quantity: 1, cost: 2 },
    { id: '1312', item: 'Sunscreen', quantity: 1, cost: 4 },
    { id: '1342', item: 'Cooler', quantity: 1, cost: 25 },
    { id: '1325', item: 'Swim suit', quantity: 1, cost: 15 },
    { id: '1352', item: 'tea', quantity: 4, cost: 34 },
    { id: '1382', item: 'Towel', quantity: 1, cost: 5 },
    { id: '1392', item: 'Frisbee', quantity: 1, cost: 2 },
    { id: '13526', item: 'Sunscreen', quantity: 1, cost: 4 },
    { id: '1932', item: 'Cooler', quantity: 1, cost: 25 },
    { id: '1032', item: 'Swim suit', quantity: 1, cost: 15 },
    { id: '1320', item: 'tea', quantity: 1, cost: 34 },
  ];

  onAddBTN(e: void) {
    console.log('onAddBTN');
    this.dialog
      .open(ItemsListComponent, {
        data: {
          animal: 'panda',
        },
        hasBackdrop: true,
        backdropClass: 'bg-slate-900',
        height: '90%',
      })
      .afterClosed()
      .subscribe({
        next: (res) => {
          console.log('ItemsListComponent Success', res);
        },
        error: (err) => {
          console.log('ItemsListComponent error', err);
        },
      });
  }
  onSubmitBTN(e: void) {
    console.log('onSubmitBTN');
  }

  addQuantity(selectedTransaction: Transaction) {
    const transaction = this.transactions.find(
      (t) => t.id === selectedTransaction.id
    );
    if (transaction) {
      transaction.quantity++;
    }
  }

  reduceQuantity(selectedTransaction: Transaction) {
    const transaction = this.transactions.find(
      (t) => t.id === selectedTransaction.id
    );
    if (transaction && transaction.quantity) {
      transaction.quantity--;
    }
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions
      .map((t) => t.cost * t.quantity)
      .reduce((acc, value) => acc + value, 0);
  }

  getTotalItem() {
    return this.transactions
      .map((t) => t.quantity)
      .reduce((acc, value) => acc + value, 0);
  }
}
