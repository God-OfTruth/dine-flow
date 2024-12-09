import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  TableClickEvent,
  TableComponent,
} from 'app/components/table/table.component';
import { TableDataSource } from 'app/models/table.model';
import { UsersService } from 'app/services/users.service';
import { Subject, takeUntil } from 'rxjs';
import { TenantComponent } from './tenant/tenant.component';

@Component({
  selector: 'app-tenants',
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
  templateUrl: './tenants.component.html',
})
export class TenantsComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _tenantService = inject(UsersService);
  private dialog = inject(MatDialog);

  columns: Array<TableDataSource> = [
    {
      header: 'Username',
      columnDef: 'username',
      cell: (ele: any) => {
        return ele.username;
      },
    },
    {
      header: 'Email',
      columnDef: 'email',
      cell: (ele: any) => {
        return ele.email;
      },
    },

    {
      header: 'Enabled',
      columnDef: 'enabled',
      cell: (ele: any) => {
        return ele?.enabled ?? 'N/A';
      },
    },
    {
      header: 'External',
      columnDef: 'externalAccount',
      cell: (ele: any) => {
        return ele?.externalAccount ?? 'N/A';
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
        {
          id: 'ACTIVATE',
          icon: 'switches',
          text: 'Activate/Deactivate',
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
    this.getAllUsers();
  }

  getAllUsers() {
    this._tenantService
      .getAllUsers()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (res) => {
          this.dataSource = res;
        },
      });
  }

  onCreateTenant(data = null) {
    this.dialog
      .open(TenantComponent, {
        hasBackdrop: true,
        backdropClass: 'backdrop-class',
        disableClose: true,
        data: data,
        width: '80%',
      })
      .afterClosed()
      .subscribe({
        next: (res) => {
          console.log('onCreateTenant()', res);
          this.getAllUsers();
        },
      });
  }

  onMenuClick(e: TableClickEvent) {
    console.log('onMenuClick', e);
    switch (e.type) {
      case 'VIEW':
        console.log('TableClickEvent', e);
        this.onCreateTenant(e.row);
        break;
      case 'ACTIVATE':
        this.handleActiveDeactivate(e.row);
    }
  }
  handleActiveDeactivate(row: any) {
    this._tenantService.updateUserStatus(row.id, !row.enabled).subscribe({
      next: (re) => {
        console.log('enabled', re);
      },
    });
  }

  onSortChange(e: any) {
    console.log('onMenuClick', e);
  }
}
