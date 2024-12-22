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
  ],
  templateUrl: './items-list.component.html',
})
export class ItemsListComponent implements OnInit {
  @ViewChild('menuItems') menuItems: any;
  private data: Menu[] = inject(MAT_DIALOG_DATA);
  private _dialogRef = inject(MatDialogRef<ItemsListComponent>);

  items: Array<Menu> = [];
  selectedItems: Array<Item> = [];

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
    this._dialogRef.close(this.selectedItems);
  }

  update(e: MatCheckboxChange) {
    const menu = this.items.find((m) => m.id === e.source.value.split('_')[0]);
    const item = menu?.items.find(
      (i) => i.name === e.source.value.split('_')[1]
    );

    if (e.checked && item) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(
        this.selectedItems.findIndex((a) => a.id === item?.id),
        1
      );
    }
  }
}
