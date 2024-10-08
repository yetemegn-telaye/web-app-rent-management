import Time from "react-datepicker/dist/time"

export interface Building {
    id: number
    total_spaces: number
    available_spaces:number
    occupied_spaces: number
    total_size: number
    tot_num_floors: number
    total_parking_space: number
    manager_id: number
    elevator: boolean
    bank_account_number: number
    open_house_start_time: string
    open_house_end_time: string
    repeat: string[]
  }
  
  export interface CreateOpenHouseDate {
    start_time: Time
    end_time: Time
    repeat: string[]
    building_id: number
  }