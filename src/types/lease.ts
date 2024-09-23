export interface CreateLease {
    lease_start_date: string
    lease_end_date: string
    lease_update_date: string
    rent_price: number
    rent_payment_date: string
    rent_payment_period: string
    penalty_amount: number
    penalty_waiting_period: number
    lease_image: string
    deposit_slip_image: string
  }
  
  export interface Lease {
    id: number
    lease_start_date: string
    lease_end_date: string
    lease_update_date: string
    rent_price: number
    rent_payment_date: string
    rent_payment_period: string
    penalty_amount: number
    penalty_waiting_period: number
    lease_image: string
    deposit_slip_image: string
  }
  