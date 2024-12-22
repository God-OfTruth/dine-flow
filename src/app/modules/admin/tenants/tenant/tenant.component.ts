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
import { UserProfileService } from 'app/services/user-profile.service';
import { UsersService } from 'app/services/users.service';

@Component({
  selector: 'app-tenant',
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './tenant.component.html',
})
export class TenantComponent implements OnInit {
  private _dialogRef = inject(MatDialogRef<TenantComponent>);
  private data = inject(MAT_DIALOG_DATA);
  private _userService = inject(UsersService);
  private _userProfileService = inject(UserProfileService);

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobileNumber: new FormControl('', [Validators.required]),
  });

  userProfile = new FormGroup({
    profileId: new FormControl(null, [Validators.required]),
    count: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    console.log('Create new Tenant', this.data);
    this.userForm.patchValue(this.data);
    this._userProfileService.getProfileById(this.data.profileId).subscribe({
      next: (res) => {
        console.log('USER Profile', res);
        this.userProfile.patchValue({
          profileId: res.id,
          count: res.restaurantsLicensed,
        });
      },
    });
  }

  onSave() {
    console.log('onSave()', this.userForm.value);
    if (this.userForm.valid) {
      const val = this.userForm.value;
      this._userService
        .createTenant({
          email: val.email ?? '',
          mobileNumber: val.mobileNumber ?? '',
          username: val.username ?? '',
        })
        .subscribe({
          next: (res) => {
            console.log('create', res);
            this._dialogRef.close();
          },
        });
    }
  }

  updateRestaurantsLicensed() {
    if (this.userProfile.value.profileId && this.userProfile.value.count) {
      this._userProfileService
        .updateRestaurantLicensed(
          this.userProfile.value.profileId,
          this.userProfile.value.count
        )
        .subscribe({
          next: (res) => {
            console.log('this.userProfile.value.profileId', res);
          },
        });
    }
  }
}
