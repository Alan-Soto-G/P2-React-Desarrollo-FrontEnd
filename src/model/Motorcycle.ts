import type { Issue } from "./Issue"
import type { Order } from "./Order"
import type { Shift } from "./Shift"

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