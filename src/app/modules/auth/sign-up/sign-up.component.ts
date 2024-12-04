import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from 'app/core/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  private _authService = inject(AuthService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  signUpForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    agreements: new FormControl(false, [Validators.requiredTrue]),
  });

  signUp() {
    if (this.signUpForm.invalid) {
      return;
    }
    const value = this.signUpForm.value;
    this._authService
      .signUp({
        email: value.email || '',
        password: value.password || '',
        username: value.username || '',
      })
      .subscribe({
        next: (res) => {
          console.log('res', res);
        },
      });
  }
}
