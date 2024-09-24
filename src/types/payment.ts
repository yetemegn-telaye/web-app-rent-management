
export interface makePayment {
    payment_id: number
    deposit_slip_image: string
    paid_date: string
}

export interface approvePayment {
    payment_id: number
    status: string
    receipt_image: string
    invoice_id: string
}

export interface rejectPayment {
  payment_id: number
}

export interface getTotalPaymentBySpace{
  total_rent_amount: number
}

export interface Payment {
    id: number
    invoice_id: string
    invoice_image: string
    status: string
    due_date: string
    paid_date: string
    payment_price: number
    utility_price: number
    total_rent_price: number
    paid_by: string
    space_id: number
    tenant_id: number
    lease_id: number
  }

