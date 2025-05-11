import { Order } from "./Order"
import { Product } from "./Product"
import { Restaurant } from "./Restaurant"

export interface Menu{
    id?: number
    restaurant_id?: number 
    product_id?: number
    price?: number
    availability?: boolean
    products?: Product[]
    restaurants?: Restaurant[]
    orders?: Order[]

}