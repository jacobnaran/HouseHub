export interface InventoryItem {
  //? means optional
  $key?: string,
  name: string;
  quantity?: number;
  Expiration_date?: string;
}
