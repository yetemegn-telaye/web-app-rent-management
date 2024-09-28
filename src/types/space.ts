export interface CreateSpace {
    space_id: string
    size: number
    pictures: string[]
    coverImage: string
    on_floor: number
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
    pictures: string[]
    coverImage: string
    on_floor: number
    space_purpose: string
    price: number
    number_of_rooms: number
    space_status: string
    num_of_views: number
    space_feature_id: number
  }