import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { AuthService } from 'app/core/auth.service';
import { CommonService, MessageIds } from 'app/services/common.service';

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterLink,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  private _authService = inject(AuthService);
  private _commonService = inject(CommonService);
  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    // username: new FormControl('', [Validators.required]),
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
  });

  resetPassword() {
    this._authService.resetPassword(this.resetForm.value).subscribe({
      next: () => {
        this._commonService.changeMessage({
          id: MessageIds.SNACKBAR,
          data: {
            message: 'Password reset successfully',
            type: 'success',
          },
        });
      },
    });
  }
}
