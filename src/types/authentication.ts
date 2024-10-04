export interface TenantUser{
    id: number
    first_name: string
    middle_name: string
    last_name: string
    company_name: string
    industry: string
    national_id_image: string
    gender: string
    phone_number: string
    email: string
    business_license_image: string
    lease_id: number
    role: string
  }

export interface BuildingManagerUser{
    id: number
    first_name: string
    middle_name: string
    last_name: string
   building_id: number
    gender: string
    phone_number: string
    email: string
    role: string
    access_token: string
}
  
  