import Time from "react-datepicker/dist/time"

export interface Building {
    id: number
    total_spaces: number
    available_spaces:number
    occupied_spaced: number
    total_size: number
    tot_num_floors: number
    total_parking_space: number
    manager_id: number
    elevator: boolean
    bank_account_number: number
  }
  
  export interface CreateOpenHouseDate {
    start_time: Time
    end_time: Time
    repeat: string[]
    building_id: number
  }