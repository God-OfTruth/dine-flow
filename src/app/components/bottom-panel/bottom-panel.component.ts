import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-bottom-panel',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './bottom-panel.component.html',
})
export class BottomPanelComponent {

}
