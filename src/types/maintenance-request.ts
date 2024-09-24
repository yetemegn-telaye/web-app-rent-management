export interface CreateMaintenanceRequest {
    pictures: string[]
    priority: string
    description: string
    maintenance_type: string
    status: string
    user_id: number
    space_id: number
  }
  

  export interface Maintenance {
    id: number
    pictures: string[]
    priority: string
    description: string
    maintenance_type: string
    status: string
    user_id: number
    space_id: number
  }

  export interface StartMaintenanceFix{
    request_id: number
    status: string
  }

  export interface CompleteMaintenance {
    request_id: number
    fixed_images: string[]
  }

  export interface ApproveMaintenanceRequest {
    user_id: number
    request_id:number
    status: string
  }