export interface Basket{
  items: Item[]
  totalPrice: number
}
export interface Item{
    id:number,
    name:string,
    price: number
}