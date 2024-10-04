export interface CreateSpaceFeature {
    surveillance_camera: boolean
    previous_use: string
    balcony: boolean
    furnished: boolean
    natural_light: boolean
    high_ceiling: boolean
    wall_paint: string
    position_on_building: string
    conference_rooms: number
    space_id: number
  }
  

export interface SpaceFeature {
    id: number
    surveillance_camera: boolean
    previous_use: string
    balcony: boolean
    furnished: boolean
    natural_lighting: boolean
    high_ceiling: boolean
    wall_paint: string
    position_on_building: string
    conference_rooms: number
    space_id: number
  }