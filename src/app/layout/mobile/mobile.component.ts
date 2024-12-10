import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BottomPanelComponent } from 'app/components/bottom-panel/bottom-panel.component';
import { ToolbarComponent } from 'app/components/toolbar/toolbar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ItemsListComponent } from 'app/components/items-list/items-list.component';
import { MatDividerModule } from '@angular/material/divider';
import { MenuService } from 'app/services/menu.service';
import { Subject, takeUntil } from 'rxjs';
import { Menu } from 'app/models/menu.model';
import { Item } from 'app/models/items.model';
import { Transaction } from 'app/models/transaction.model';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mobile.component.html',
})
export class MobileComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _menuService = inject(MenuService);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);
  displayedColumns: string[] = ['item', 'quantity', 'cost'];
  transactions: Transaction[] = [];
  menus?: Menu[];

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.getMenuByRestaurant();
  }
  getMenuByRestaurant() {
    this._menuService
      .getAllMenus()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (res) => {
          this.menus = res;
        },
      });
  }

  onAddBTN(e: void) {
    this.dialog
      .open(ItemsListComponent, {
        data: this.menus,
        hasBackdrop: true,
        backdropClass: 'backdrop-class',
        width: '90%',
      })
      .afterClosed()
      .subscribe({
        next: (res: Array<Item>) => {
          const sItems = this.transactions.map((i) => i.id);
          const selectedItems = res
            .filter((i) => !sItems.includes(i.name))
            .map((item) => {
              return {
                id: item.name,
                cost: item.basePrice.amount - item.basePrice.discount,
                item: item.name,
                quantity: 1,
              };
            });
          this.transactions = this.transactions.concat(selectedItems);
          console.log('ItemsListComponent Success', this.transactions);
          this.cdr.detectChanges();
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
