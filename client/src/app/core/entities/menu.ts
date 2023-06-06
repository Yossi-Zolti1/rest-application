export interface RestaurantState {
    menus:Menu[]
}
export interface Menu{
    id?: number
    name:string
    image?: string
    restId?: number
    departments?: Department[]
}
export interface Department{
    id?: number
    name:string
    image?:string
    menuId?:number
    items?:Item[]
}
export interface Item{
    id?:number
    name:string
    description: string
    price: number
    image?:string
    comment?:string
    departmentId?:number
}