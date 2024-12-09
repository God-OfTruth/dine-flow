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
  ],
  templateUrl: './restaurant.component.html',
})
export class RestaurantComponent implements OnInit {
  private _dialogRef = inject(MatDialogRef<TenantComponent>);
  private _restaurantService = inject(RestaurantsService);
  private data = inject(MAT_DIALOG_DATA);

  form = new FormGroup({
    id: new FormControl(null, []),
    name: new FormControl('', [Validators.required]),
    tagLine: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    menuIds: new FormControl([]),
    managers: new FormControl([]),
    staffs: new FormControl([]),
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
  managers: {
    key: string;
    value: string;
  }[] = [];
  staffs: {
    key: string;
    value: string;
  }[] = [];

  ngOnInit(): void {
    console.log('Data', this.data);
    this.form.patchValue(this.data);
  }

  onSave() {
    console.log('onSave()', this.form.value);
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
            // mapsUrls: val.address?.mapsUrls ?? {},
            plusCode: val.address?.plusCode ?? '',
            shortAddress: val.address?.shortAddress ?? '',
          },
          managers: [],
          mediaIds: [],
          menuIds: [],
          ownerId: null,
          staffs: [],
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
