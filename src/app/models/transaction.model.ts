import { Item } from './items.model';
import { Price } from './price.model';

export interface Transaction {
  id: string;
  itemName: string;
  quantity: number;
  cost: number;
  option: string;
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
