import { Menu } from "./Menu"

export interface Restaurant{
    id?: number 
    name?: string
    address?: string 
    phone?: string
    email?: string
    menus?: Menu[]
}