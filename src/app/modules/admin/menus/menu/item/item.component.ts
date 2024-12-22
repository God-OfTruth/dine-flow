import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-item',
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './item.component.html',
})
export class ItemComponent implements OnInit {
  private fb = inject(FormBuilder);
  private _dialogRef = inject(MatDialogRef<ItemComponent>);
  private data = inject(MAT_DIALOG_DATA);

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(),
    tags: new FormControl([]),
    mediaIds: new FormControl([]),
    mainMediaId: new FormControl(),
    basePrice: new FormGroup({
      discount: new FormControl(),
      amount: new FormControl(null, [Validators.required]),
    }),
    enabled: new FormControl(false),
    sellCount: new FormControl(),
    taxes: new FormControl(null),
  });

  mediaIds: {
    key: string;
    value: string;
  }[] = [];

  ngOnInit(): void {
    console.log('data', this.data);
    this.form.patchValue(this.data);
  }

  onSave() {
    console.log('onSave()', this.form.value);
    this._dialogRef.close(this.form.value);
  }
}
