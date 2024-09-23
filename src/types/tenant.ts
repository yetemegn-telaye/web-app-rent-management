
export interface CreateTenant {
    first_name: string
    middle_name: string
    last_name: string
    company_name: string
    industry: string
    identification_image: string
    gender: string
    phone_number: string
    email: string
    business_license_image: string
}

export interface Tenant {
    id: number
    first_name: string
    middle_name: string
    last_name: string
    company_name: string
    industry: string
    identification_image: string
    gender: string
    phone_number: string
    email: string
    business_license_image: string
    lease_id: number
}


  