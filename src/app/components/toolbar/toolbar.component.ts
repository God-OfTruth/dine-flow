import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  @Output('onMenu') onMenu: EventEmitter<void> = new EventEmitter();
  private _router = inject(Router);
  onMenuBTN() {
    this.onMenu.emit();
  }

  onLogout() {
    this._router.navigate(['sign-out']);
  }
}
