import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  TableClickEvent,
  TableComponent,
} from 'app/components/table/table.component';
import { TableDataSource } from 'app/models/table.model';
import { MenuComponent } from './menu/menu.component';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'app/services/menu.service';
import { Subject, takeUntil } from 'rxjs';
import { Menu } from 'app/models/menu.model';

@Component({
  selector: 'app-menus',
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TableComponent,
    MatButtonModule,
  ],
  templateUrl: './menus.component.html',
})
export class MenusComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _menuService = inject(MenuService);
  private dialog = inject(MatDialog);
  columns: Array<TableDataSource> = [
    {
      header: 'Name',
      columnDef: 'name',
      cell: (ele: Menu) => {
        return ele.name;
      },
    },
    {
      header: 'Description',
      columnDef: 'description',
      cell: (ele: Menu) => {
        return ele.description;
      },
    },
    {
      header: 'Total Items',
      columnDef: 'items',
      cell: (ele: Menu) => {
        return ele.items?.length;
      },
    },
    {
      header: 'Total Restaurants Using',
      columnDef: 'restaurantIds',
      cell: (ele: Menu) => {
        return ele.restaurantIds.length;
      },
    },
    {
      header: 'Is Active',
      columnDef: 'active',
      cell: (ele: Menu) => {
        return ele.active ? 'Active' : 'In Active';
      },
    },
    {
      columnDef: 'actions',
      header: 'Action',
      cell: () => [
        {
          id: 'VIEW',
          icon: 'visibility',
          text: 'View',
        },
      ],
    },
  ];
  dataSource: Array<any> = [];

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.getAllMenus();
  }

  onCreateMenu() {
    console.log('onCreateMenu');
    this.dialog
      .open(MenuComponent, {
        hasBackdrop: true,
        backdropClass: 'backdrop-class',
        disableClose: true,
        // height: '80%',
        width: '80%',
      })
      .afterClosed()
      .subscribe({
        next: (res) => {
          console.log('onCreateRestaurant()', res);
          this.getAllMenus();
        },
      });
  }

  getAllMenus() {
    this._menuService
      .getAllMenus()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (res) => {
          this.dataSource = res;
          console.log('ele.', res[0]);
        },
      });
  }

  onMenuClick(e: TableClickEvent) {
    console.log('onMenuClick', e);
    switch (e.type) {
      case 'VIEW':
        console.log('TableClickEvent', e);
        this.handleView(e);
        break;
    }
  }
  handleView(e: TableClickEvent) {
    this.dialog
      .open(MenuComponent, {
        hasBackdrop: true,
        backdropClass: 'backdrop-class',
        disableClose: true,
        data: e.row,
        // height: '80%',
        width: '80%',
      })
      .afterClosed()
      .subscribe({
        next: (res) => {
          console.log('onCreateRestaurant()', res);
          this.getAllMenus();
        },
      });
  }

  onSortChange(e: any) {
    console.log('onMenuClick', e);
  }
}
