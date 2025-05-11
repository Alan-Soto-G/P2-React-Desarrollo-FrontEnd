import { Menu } from "./Menu"

export interface Product{
    id?: number
    name?: string   
    description?: string 
    price?: number
    category?: string
    menus?: Menu[]
}