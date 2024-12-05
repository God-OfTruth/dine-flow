import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TableComponent } from 'app/components/table/table.component';
import { TableDataSource } from 'app/models/table.model';
import { UsersService } from 'app/services/users.service';
import { Subject, takeUntil } from 'rxjs';

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

  onMenuClick(e: any) {
    console.log('onMenuClick', e);
  }

  onSortChange(e: any) {
    console.log('onMenuClick', e);
  }
}
