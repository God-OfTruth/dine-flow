import { Price } from './price.model';

export interface Item {
  id: string;
  name: string;
  description: string;
  tags: string[];
  mediaIds: string[];
  mainMediaId: string;
  itemOptions: any[];
  basePrice: Price;
  enabled: boolean;
  sellCount: number;
  taxes: any;
}
