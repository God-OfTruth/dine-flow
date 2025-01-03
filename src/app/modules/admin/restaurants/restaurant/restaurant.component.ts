import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TenantComponent } from '../../tenants/tenant/tenant.component';
import { RestaurantsService } from 'app/services/restaurants.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MenuService } from 'app/services/menu.service';
import { Subject, takeUntil } from 'rxjs';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-restaurant',
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './restaurant.component.html',
})
export class RestaurantComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _dialogRef = inject(MatDialogRef<TenantComponent>);
  private _restaurantService = inject(RestaurantsService);
  private _menuService = inject(MenuService);
  private data = inject(MAT_DIALOG_DATA);

  announcer = inject(LiveAnnouncer);

  form = new FormGroup({
    id: new FormControl(null, []),
    name: new FormControl('', [Validators.required]),
    tagLine: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    menuIds: new FormControl(),
    managers: new FormControl(),
    staffs: new FormControl(),
    mediaIds: new FormControl(),
    address: new FormGroup({
      fullAddress: new FormControl('', []),
      locality: new FormControl('', []),
      mapsUrls: new FormControl('', []),
      plusCode: new FormControl('', []),
      shortAddress: new FormControl('', []),
    }),
  });

  menuIds: {
    key: string;
    value: string;
  }[] = [];
  mediaIds: {
    key: string;
    value: string;
  }[] = [];
  staffs: {
    key: string;
    value: string;
  }[] = [];

  ngOnInit(): void {
    this.getAllMenus();
    // this.getAllUsers();
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  get managers(): string[] {
    return this.form.controls.managers.value ?? [];
  }

  set managers(value: string[]) {
    this.form.patchValue({
      managers: value,
    });
  }

  removeManager(manager: any) {
    this.managers = this.managers.filter((m) => m !== manager);
  }

  addManager(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    // Add our keyword
    if (value) {
      this.form.patchValue({
        managers: [...this.managers, value],
      });
      this.announcer.announce(`added ${value} to reactive form`);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  // getAllUsers() {
  //   this._tenantService
  //     .getAllUsers()
  //     .pipe(takeUntil(this._unsubscribeAll))
  //     .subscribe({
  //       next: (res) => {
  //         this.managers = res.map((user) => {
  //           return {
  //             key: user.username,
  //             value: user.id,
  //           };
  //         });
  //         this.staffs = res.map((user) => {
  //           return {
  //             key: user.username,
  //             value: user.id,
  //           };
  //         });
  //       },
  //     });
  // }

  getAllMenus() {
    this._menuService
      .getAllMenus()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (res) => {
          this.menuIds = res.map((menu) => {
            return {
              key: menu.name,
              value: menu.id,
            };
          });
        },
      });
  }

  onSave() {
    if (this.form.valid) {
      const val = this.form.value;
      this._restaurantService
        .createRestaurant({
          id: val.id ?? null,
          name: val.name ?? '',
          tagLine: val.tagLine ?? '',
          description: val.description ?? '',
          address: {
            fullAddress: val.address?.fullAddress ?? '',
            locality: val.address?.locality ?? '',
            plusCode: val.address?.plusCode ?? '',
            shortAddress: val.address?.shortAddress ?? '',
          },
          managers: val.managers ?? [],
          mediaIds: val.mediaIds,
          menuIds: val.menuIds,
          ownerId: null,
          staffs: val.staffs,
        })
        .subscribe({
          next: (res) => {
            console.log('create', res);
            this._dialogRef.close();
          },
        });
    }
  }
}
