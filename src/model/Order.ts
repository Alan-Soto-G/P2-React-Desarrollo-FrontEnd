import { Address } from "./Address"
import { Customer } from "./Customer"
import { Menu } from "./Menu"
import { Motorcycle } from "./Motorcycle"

export interface Order{
    id?: number 
    motorcycle_id?: number
    customer_id?: number 
    menu_id?: number
    quantify?: number
    total_price?: number
    status?: string
    motorcycles?: Motorcycle[]
    customers?: Customer[]
    menus?: Menu[]
    addresses?: Address[]
}