import type { Infringement } from "./Infringement"
import type { Motorcycle } from "./Motorcycle"

export interface MotorcycleInfringement {
    id?: number
    date?: Date
    motorcycle: Motorcycle[]
    infringemet?: Infringement
}
