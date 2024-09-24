export interface CreateSpaceState {
    space_id: number
    lease_id: number
    current_images: string
    damage: {
      damage_description: string
      damage_image: string
    }
  }
  

  export interface SpaceState {
    id: number
    space_id: number
    lease_id: number
    space_state_date: Date
    current_images: string
    damage: {
      damage_description: string
      damage_image: string
    }
  }
  