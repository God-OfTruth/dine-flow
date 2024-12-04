import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-bottom-panel',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
  ],
  templateUrl: './bottom-panel.component.html',
})
export class BottomPanelComponent {
  @Output('onAdd') onAdd = new EventEmitter<void>();
  @Output('onSubmit') onSubmit = new EventEmitter<void>();

  onAddBTN() {
    this.onAdd.emit();
  }

  onSubmitBTN() {
    this.onSubmit.emit();
  }
}
