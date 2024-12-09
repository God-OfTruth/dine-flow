import { Item } from './items.model';

export interface Menu {
  id: string | null;
  name: string;
  description: string;
  restaurantIds: string[];
  items: Item[];
  active: boolean;
}
