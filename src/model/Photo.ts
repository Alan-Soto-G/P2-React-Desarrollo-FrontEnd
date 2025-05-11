import { Issue } from "./Issue"
export interface Photo{
    id?: number
    issue_id?: number 
    image_url?: string
    caption?: string
    taken_at?: Date
    issues?: Issue[]
}