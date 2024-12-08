import { Address } from './address.model';

export interface Restaurant {
  id?: string | null;
  name: string;
  tagLine: string;
  description: string;
  ownerId?: string | null;
  menuIds?: string[];
  managers?: string[];
  staffs?: string[];
  mediaIds?: string[];
  address: Address;
}
