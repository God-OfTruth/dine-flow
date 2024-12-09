import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MenuService } from 'app/services/menu.service';
import { ItemComponent } from './item/item.component';
import { MatCardModule } from '@angular/material/card';
import { Item } from 'app/models/items.model';

@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  private _dialogRef = inject(MatDialogRef<MenuComponent>);
  private data = inject(MAT_DIALOG_DATA);
  private _menuService = inject(MenuService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);

  form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(),
    active: new FormControl(false),
    description: new FormControl(),
    items: new FormControl(),
    restaurantIds: new FormControl([]),
  });
  items: any[] = [];
  restaurants: {
    key: string;
    value: string;
  }[] = [];
  ngOnInit(): void {
    console.log('data', this.data);
    this.form.patchValue(this.data);
    this.items = this.data.items;
  }

  // get items(): FormArray {
  //   return this.form.get('items') as FormArray;
  // }

  addItems() {
    this.dialog
      .open(ItemComponent, {
        hasBackdrop: true,
        backdropClass: 'backdrop-class',
        disableClose: true,
        data: null,
        // height: '80%',
        width: '80%',
      })
      .afterClosed()
      .subscribe({
        next: (item: any) => {
          this.items.push(item);
        },
      });
    // const form = this.fb.group({
    //   name: new FormControl(),
    //   description: new FormControl([]),
    //   tags: new FormControl(),
    //   mediaIds: new FormControl(),
    //   mainMediaId: new FormControl(),
    //   basePrice: new FormGroup({
    //     discount: new FormControl(),
    //     amount: new FormControl(),
    //   }),
    //   enabled: new FormControl(),
    //   sellCount: new FormControl(),
    // });
    // this.items.push(form);
  }

  onViewItem(item: Item) {
    this.dialog
      .open(ItemComponent, {
        hasBackdrop: true,
        backdropClass: 'backdrop-class',
        disableClose: true,
        data: item,
        // height: '80%',
        width: '80%',
      })
      .afterClosed()
      .subscribe({
        next: (item: any) => {
          // this.items.push(item);
        },
      });
  }

  removeManager(i: number) {
    this.items.splice(i, 1);
  }

  onSave() {
    this.form.patchValue({
      items: this.items,
    });
    console.log('onSave()', this.form.value, this.items);
    if (this.form.valid) {
      const val = this.form.value;
      const items: any[] = val.items ?? [];
      this._menuService
        .createNewMenu({
          id: val.id ?? null,
          active: val.active ?? false,
          description: val.description,
          items: items,
          name: val.name,
          restaurantIds: val.restaurantIds ?? [],
        })
        .subscribe({
          next: (res) => {
            console.log('create', res);
            this._dialogRef.close();
          },
          error: (err) => {
            console.log('err', err);
          },
        });
    }
  }
}
