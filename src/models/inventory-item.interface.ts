export interface InventoryItem {
  //? means optional
  $key?: string,
  name: string;
  quantity?: number;
  weeksLeft?: string;
  expDate?: string;

}
