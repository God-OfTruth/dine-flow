import { Component, inject, ViewEncapsulation } from '@angular/core';
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
  selector: 'app-sign-in',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
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
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  private _authService = inject(AuthService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  alert: { type: string; message: string } = {
    type: 'success',
    message: '',
  };

  signInForm = new FormGroup({
    username: new FormControl('varta', [Validators.required]),
    password: new FormControl('Varta@123', [Validators.required]),
    rememberme: new FormControl(false),
  });
  showAlert: boolean = false;
  signIn() {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;
    const value = this.signInForm.value;
    // Sign in
    this._authService
      .signIn({
        username: value.username || '',
        password: value.password || '',
        rememberme: value.rememberme || false,
      })
      .subscribe({
        next: (res) => {
          // Set the redirect url.
          // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
          // to the correct page after a successful sign in. This way, that url can be set via
          // routing file and we don't have to touch here.
          const redirectURL =
            this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
            '/signed-in-redirect';
          console.log('user', res, redirectURL);

          // Navigate to the redirect url
          this._router.navigateByUrl(redirectURL);
        },
        error: (response) => {
          // Re-enable the form
          this.signInForm.enable();

          // Reset the form
          this.signInForm.reset();

          // Set the alert
          this.alert = {
            type: 'error',
            message: 'Wrong email or password',
          };

          // Show the alert
          this.showAlert = true;
        },
      });
  }
}
