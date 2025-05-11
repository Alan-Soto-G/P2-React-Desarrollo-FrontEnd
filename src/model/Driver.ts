import { Shift } from "./Shift"
export interface Driver{
    id?: number
    name?: string
    license_number?: string
    phone?: string
    email?: string
    status?: string
    shifts?: Shift[]
}