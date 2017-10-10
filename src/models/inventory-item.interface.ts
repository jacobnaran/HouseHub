export interface InventoryItem {
  //? means optional
  $key?: string,
  name: string;
  quantity?: number;
  expDate?: string;
}
