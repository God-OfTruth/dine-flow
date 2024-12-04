import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'app/core/auth.service';
import { finalize, Subject, takeUntil, takeWhile, tap, timer } from 'rxjs';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sign-out.component.html',
})
export class SignOutComponent implements OnInit, OnDestroy {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  countdown: number = 5;
  countdownMapping: any = {
    '=1': '# second',
    other: '# seconds',
  };

  ngOnInit(): void {
    this._authService.signOut();
    // Redirect after the countdown
    timer(1000, 1000)
      .pipe(
        finalize(() => {
          this._router.navigate(['sign-in']);
        }),
        takeWhile(() => this.countdown > 0),
        takeUntil(this._unsubscribeAll),
        tap(() => this.countdown--)
      )
      .subscribe();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
