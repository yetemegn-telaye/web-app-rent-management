export interface CreateMaintenanceRequest {
    pictures: string[]
    priority: string
    description: string
    maintenance_type: string
    status: string
    tenant_id: number
    space_id: number
  }
  

  export interface Maintenance {
    id: number
    pictures: string[]
    estimated_price: number | null
    priority: string
    description: string
    maintenance_team: string | null
    maintenance_type: string
    status: string
    created_at: string
    tenant_id: number
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