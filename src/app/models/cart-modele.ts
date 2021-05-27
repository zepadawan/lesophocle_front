import { Item } from "./item-modele"

export class Cart {
  items: Item[];
  resume: {
    quantity: number,
    cost: number
  }
}