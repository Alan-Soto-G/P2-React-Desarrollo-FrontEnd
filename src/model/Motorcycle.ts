import { Issue } from "./Issue"
import { Order } from "./Order"
import { Shift } from "./Shift"

export interface Motorcycle{
    id ?: number
    license_place?: string
    brand?: string
    year?: number
    status?: string
    shifts?: Shift[]
    orders?: Order[]
    issues?: Issue[]

}