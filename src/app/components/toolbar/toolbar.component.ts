import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {

}
