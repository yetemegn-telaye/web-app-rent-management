export interface CreateSpaceState {
    space_id: number
    current_images: string
    damage: {
      damage_description: string
      damage_image: string
    }
  }
  

  export interface SpaceState {
    id: number
    space_id: number
    tenant_id_entered: number
    space_state_date: string
    current_images: string
    damage: {
      damage_description: string
      damage_image: string
    }
  }
  