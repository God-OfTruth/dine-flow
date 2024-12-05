import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, MatCardModule],
  templateUrl: './reports.component.html',
})
export class ReportsComponent {}
