import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  ],
  templateUrl: './restaurant.component.html',
})
export class RestaurantComponent {
  private _dialogRef = inject(MatDialogRef<TenantComponent>);
  private _restaurantService = inject(RestaurantsService);
  private data = inject(MAT_DIALOG_DATA);

  form = new FormGroup({
    id: new FormControl(null, []),
    name: new FormControl('Tea Day', [Validators.required]),
    tagLine: new FormControl('Tea for a Day', [Validators.required]),
    description: new FormControl('Tea for a Day', [Validators.required]),
    address: new FormGroup({
      fullAddress: new FormControl('Kadubisanahali', []),
      locality: new FormControl('Kadubisanahali', []),
      mapsUrls: new FormControl('Kadubisanahali', []),
      plusCode: new FormControl('Kadubisanahali', []),
      shortAddress: new FormControl('Kadubisanahali', []),
    }),
  });

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
