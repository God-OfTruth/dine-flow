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
import { Transaction, TransactionSlip } from 'app/models/transaction.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionComponent } from 'app/components/transaction/transaction.component';

@Component({
  selector: 'home',
  standalone: true,
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
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _menuService = inject(MenuService);

  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  displayedColumns: string[] = ['item', 'quantity', 'cost'];
  transactions: Transaction[] = [];
  menus?: Menu[];
  restaurantId?: string;
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        if (res.has('id')) {
          this.restaurantId = res.get('id')?.toString();
        }
      });
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
        next: (res) => {
          if (res) {
            const sItems = this.transactions.map((i) => i.id);
            const selectedItems = res
              .filter((i: any) => !sItems.includes(i.id))
              .map((item: any) => {
                return {
                  id: item.id,
                  cost: item.cost,
                  itemName: item.itemName,
                  quantity: 1,
                  option: item.option,
                };
              });
            this.transactions = this.transactions.concat(selectedItems);
            this.cdr.detectChanges();
          }
        },
        error: (err) => {
          console.log('ItemsListComponent error', err);
        },
      });
  }

  getItemCost(transaction: any) {
    return transaction.cost * transaction.quantity;
  }

  onSubmitBTN(e: void) {
    if (this.restaurantId) {
      console.log('this.transactions', this.transactions);
      const transaction = {
        items: this.transactions,
        comment: '',
        finalPrice: {
          amount: this.getTotalCost(),
          discount: 0,
        },
        methodType: 'CASH',
        restaurantId: this.restaurantId,
      };
      this.handleTransaction(transaction);
    }
  }

  handleTransaction(transaction: any) {
    transaction;
    this.dialog
      .open(TransactionComponent, {
        data: transaction,
        hasBackdrop: true,
        backdropClass: 'backdrop-class',
        width: '90%',
      })
      .afterClosed()
      .subscribe({
        next: (res: boolean) => {
          if (res) {
            this.transactions = [];
            this.cdr.detectChanges();
          }
        },
      });
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

  onMenuClick() {
    this.router.navigateByUrl(`/home`);
  }
}
