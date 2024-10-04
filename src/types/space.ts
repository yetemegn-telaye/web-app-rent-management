export interface CreateSpace {
    space_id: string
    size: number
    space_images: string[]
    cover_image: string
    floor: number
    space_purpose: string
    price: number
    number_of_rooms: number
    space_status: string
    building_id: number
  }
  
  export interface Space {
    id: number,
    space_id: string
    size: number
    listed_date: string
    space_images: string[]
    cover_image: string[]
    floor: number
    space_purpose: string
    price: number
    number_of_rooms: number
    space_status: string
    number_of_views: number
    building_id: number
  }