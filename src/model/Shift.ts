import type { Driver } from "./Driver"
import type { Motorcycle } from "./Motorcycle"

export interface Shift{
    id?: number
    driver_id?: number
    motorcycle_id?: number
    start_time?: Date
    end_time?: Date
    status?: string
    drivers?: Driver[]
    motorcycles?: Motorcycle[]
}