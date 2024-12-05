import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule, Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableDataSource } from 'app/models/table.model';

export type TableClickEvent = {
  type: string;
  row: any;
};

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSortModule,
    MatCheckboxModule,
  ],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  @Input('dataSource') dataSource: Array<any> = [];
  @Input('columns') columns: Array<TableDataSource> = [];
  @Output('clickEvent') event = new EventEmitter<TableClickEvent>();
  @Output('sortChange') sortEvent = new EventEmitter();
  @Output('selectionChange') selectionChange = new EventEmitter();
  selection = new SelectionModel<any>(true, []);
  displayedColumns = this.columns.map((c) => c.columnDef);
  ngOnInit(): void {
    this.displayedColumns = this.columns.map((c) => c.columnDef);
    this.selection.changed.subscribe({
      next: (res) => {
        this.selectionChange.emit(res.source.selected);
      },
    });
  }
  onSortChange(_event: Sort) {
    this.sortEvent.emit(_event);
  }
  onClick(type: string, row: any) {
    this.event.emit({
      type: type,
      row: row,
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
