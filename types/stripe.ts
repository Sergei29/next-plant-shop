export type StripeEvent<T> = {
  id: string
  object: string
  api_version: string
  created: number
  data: {
    object: T
  }
  type: string
} & Record<string, any>

export type StripeLineItem = {
  amount: number
  currency: string
  custom: {
    description: null | string
    images: null | string
    name: string
  }
  quantity: number
  type: string
}

export type StripeCheckoutSession = {
  id: string
  object: string
  livemode: boolean
  payment_intent: string
  status: "open" | "complete" | "expired"
  after_expiration: null | number
  allow_promotion_codes: null | number
  amount_subtotal: number
  amount_total: number
  automatic_tax: {
    enabled: boolean
    status: null | string
  }
  billing_address_collection: null | "required" | "auto"
  cancel_url: string
  client_reference_id: null | string
  consent: any
  consent_collection: any
  currency: string
  customer: string
  customer_creation: "always" | "if_required"
  customer_details: {
    address: {
      city: null | string
      country: null | string
      line1: null | string
      line2: null | string
      postal_code: null | string
      state: null | string
    }
    email: string
    name: string
    phone: null | number
    tax_exempt: string
    tax_ids: Record<string, any>[]
  }
  customer_email: null | string
  display_items: StripeLineItem[]
  expires_at: number
  locale: any
  metadata: Record<string, any>
  mode: "payment" | "setup" | "subscription"
  payment_link: null | string
  payment_method_options: Record<string, any>
  payment_method_types: string[]
  payment_status: "paid" | "unpaid" | "no_payment_required"
  phone_number_collection: {
    enabled: boolean
  }
  recovered_from: any
  setup_intent: any
  shipping: {
    address: {
      city: string
      country: string
      line1: string
      line2: string
      postal_code: string
      state: string
    }
    name: string
  }
  shipping_address_collection: {
    allowed_countries: string[]
  }
  shipping_options: Record<string, any>[]
  shipping_rate: null | string
  submit_type: null | "auto" | "pay" | "book" | "donate"
  subscription: null | string
  success_url: string
  total_details: {
    amount_discount: number
    amount_shipping: number
    amount_tax: number
  }
  url: null | string
}

export type StripeSessionSuccessFormatted = {
  type: string
  paymentIntent: string
  status: "open" | "complete" | "expired"
  amountTotal: number
  customerName: string
  customerEmail: string
  shippingAddress: {
    name: string
    line1: string
    line2: string
    city: string
    postCode: string
    country: null | string
  }
  orderItems: {
    title: string
    price: number
    quantity: number
  }[]
}
