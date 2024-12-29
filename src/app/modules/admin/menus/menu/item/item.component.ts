import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
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
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
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
    itemOptions: this.fb.array([]),
    enabled: new FormControl(false),
    sellCount: new FormControl(),
    taxes: new FormControl(null),
  });

  mediaIds: {
    key: string;
    value: string;
  }[] = [];

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data);
      this.data.itemOptions.forEach((itemOption: any) => {
        this.addItemOption(itemOption);
      });
    }
  }

  onSave() {
    this._dialogRef.close(this.form.value);
  }

  get itemOptions(): FormArray {
    return this.form.get('itemOptions') as FormArray;
  }

  addItemOption(val = null) {
    const form = this.fb.group({
      option: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    });
    if (val) {
      form.patchValue(val);
    }
    this.itemOptions.push(form);
  }

  removeItemOption(index: number) {
    this.itemOptions.removeAt(index);
  }
}
