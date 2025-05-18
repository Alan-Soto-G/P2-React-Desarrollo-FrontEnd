import type { Order } from "./Order"

export interface Address{
    id?: number
    order_id?: number
    street?: string 
    city?: string 
    state?: string
    postal_code?: string
    additional_info?: string
    orders?: Order[]
}