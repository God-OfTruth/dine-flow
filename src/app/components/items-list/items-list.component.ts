import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Item } from 'app/models/items.model';
import { Menu } from 'app/models/menu.model';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-items-list',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
  ],
  templateUrl: './items-list.component.html',
})
export class ItemsListComponent implements OnInit {
  @ViewChild('menuItems') menuItems: any;
  private data: Menu[] = inject(MAT_DIALOG_DATA);
  private _dialogRef = inject(MatDialogRef<ItemsListComponent>);

  items: Array<Menu> = [];
  transactions: Array<any> = [];

  ngOnInit(): void {
    this.items = this.data.map((m) => {
      m.items.map((r: any) => {
        r['id'] = `${m.id}_${r.name}`;
        return r;
      });
      return m;
    });
  }

  onSave() {
    this._dialogRef.close(this.transactions);
  }

  update(e: MatCheckboxChange, item: Item) {
    const option_selected: any = e.source.value;
    const transaction: {
      id: string;
      itemName: string;
      quantity: number;
      cost: number;
      option: string;
    } | null = {
      id: `${item.name}_${option_selected.option}`,
      itemName: item.name,
      quantity: 1,
      cost: option_selected.price,
      option: option_selected.option,
    };

    if (e.checked && item) {
      this.transactions.push(transaction);
    } else {
      this.transactions.splice(
        this.transactions.findIndex(
          (a) =>
            a.itemName === transaction.itemName &&
            a.option === transaction.option
        ),
        1
      );
    }
  }
}
