export interface Menu{
    id?: number
    name:string
    image?: string
    restId?: number
}
export interface Department{
    id?: number
    name:string
    image?:string
    menuId?:number
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