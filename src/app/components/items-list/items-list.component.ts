import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-items-list',
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatListModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './items-list.component.html',
})
export class ItemsListComponent implements OnInit {
  private data = inject(MAT_DIALOG_DATA);

  items: Array<{
    id: string;
    name: string;
    description: string;
    mainMediaId: string;
    basePrice: {
      amount: number;
      discount: number;
    };
    enabled: boolean;
    tags: string[];
    sellCount: number;
  }> = [
    {
      id: '1',
      name: 'Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Ginger Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Ginger Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Ginger Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Ginger Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Ginger Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Ginger Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Ginger Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Ginger Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Ginger Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Ginger Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Ginger Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Ginger Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Ginger Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Ginger Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
    {
      id: '1',
      name: 'Ginger Tea',
      basePrice: {
        amount: 10,
        discount: 0,
      },
      description: 'Ginger Tea for Developers',
      enabled: true,
      mainMediaId: '',
      sellCount: 10,
      tags: ['hot_drinks'],
    },
  ];

  ngOnInit(): void {
    console.log('MatDialogTitle, MatDialogContent', this.data);
  }
}
