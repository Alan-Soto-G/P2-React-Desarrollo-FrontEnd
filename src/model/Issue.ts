import type { Motorcycle } from "./Motorcycle"
import type { Photo } from "./Photo"


export interface Issue{
    id?: number
    motorcycle_id?: number
    description?: string
    issue_type?: string 
    date_reported?: Date
    status?: string
    motorcycles?: Motorcycle[]
    photos?: Photo[]
}