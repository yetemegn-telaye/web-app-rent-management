
export interface MakePayment {
    payment_id: number
    deposit_slip_image: string
    paid_date: string
}

export interface ApprovePayment {
    payment_id: number
    status: string
    receipt_image: string
    invoice_id: string
}

export interface RejectPayment {
  payment_id: number
}

export interface getTotalPaymentBySpace{
  total_rent_amount: number
}

export interface IPayment {
    id: number
    invoice_id: number
    invoice_image: string[]
    status: string
    due_date: string
    paid_date: string
    payment_price: number
    utility_price: number
    total_rent_price: number
    paid_by: number
    space_id: number
    tenant_id: number
    lease_id: number
  }

