import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatListOption } from '@angular/material/list';
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
  ],
  templateUrl: './items-list.component.html',
})
export class ItemsListComponent implements OnInit {
  @ViewChild('menuItems') menuItems: any;
  private data: Menu[] = inject(MAT_DIALOG_DATA);
  private _dialogRef = inject(MatDialogRef<ItemsListComponent>);

  items: Array<Menu> = [];

  ngOnInit(): void {
    this.items = this.data;
  }

  onSave(items: MatListOption[]) {
    console.log(
      'shoes',
      items,
      items.map((i) => i.value)
    );
    const selectedItems = items.map((i) => i.value);
    this._dialogRef.close(selectedItems);
  }
}
