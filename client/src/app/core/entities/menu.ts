export interface RestaurantState {
    Menus:Menu[]
    id: number
    name: string,
    street: string,
    city: string,
    phone: string,
    kashrut: string | null,
    type: string,
    logo: string,
    my?: FormData
    
}
export interface Menu{
    id?: number
    name:string
    image?: string
    restId?: number
    Departments?: Department[]
}
export interface Department{
    id?: number
    name:string
    image?:string
    menuId?:number
    Items?:Item[]
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