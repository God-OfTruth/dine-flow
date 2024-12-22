import { Item } from './items.model';
import { Price } from './price.model';

export interface Transaction {
  id: string;
  quantity: number;
  cost: number;
  item: Item;
}

export type TransactionSlip = {
  id?: string;
  methodType: string;
  items: Item[];
  finalPrice: Price;
  userMobileNumber?: string;
  userId?: string;
  restaurantId: string;
  comment?: string;
  tags?: string[];
};
