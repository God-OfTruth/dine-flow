import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonService, MessageIds } from './services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertSnackbarComponent } from './components/alert-snackbar/alert-snackbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'dine-flow';
  private _commonService = inject(CommonService);
  private destroy$ = new Subject<void>();
  private _snackbar = inject(MatSnackBar);

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this._commonService.currentMessage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((message) => {
        if (message) {
          switch (message?.id) {
            case MessageIds.SNACKBAR:
              this.openSnackBar(message.data);
              break;
          }
        }
      });
  }
  openSnackBar(data: any) {
    const css_class =
      data.type === 'success' ? 'green-snackbar' : 'red-snackbar';
    this._snackbar.openFromComponent(AlertSnackbarComponent, {
      data: data,
      duration: 5 * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: css_class,
    });
  }
}
