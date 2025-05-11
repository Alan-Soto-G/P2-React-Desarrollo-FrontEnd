import { Motorcycle } from "./Motorcycle"
import { Photo } from "./Photo"

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