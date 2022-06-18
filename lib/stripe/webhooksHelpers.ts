import Stripe from "stripe"
import {
  StripeCheckoutSession,
  StripeEvent,
  StripeSessionSuccessFormatted,
} from "../../types"
import { formatAmountFromStripe } from "./stripeHelpers"

export const formatCheckoutSessionCompleted = (
  apiResponseEvent: StripeEvent<StripeCheckoutSession>
): StripeSessionSuccessFormatted => {
  const {
    type,
    data: {
      object: {
        id,
        status,
        payment_intent: paymentIntent,
        amount_total,
        display_items,
        customer_details,
        shipping,
      },
    },
  } = apiResponseEvent
  const { name: customerName, email: customerEmail } = customer_details
  const {
    name,
    address: { line1, line2, city, postal_code: postCode, country },
  } = shipping
  const orderItems = display_items.map(
    ({ amount, currency, custom: { name }, quantity }) => ({
      title: name,
      price: formatAmountFromStripe(amount, currency),
      quantity,
    })
  )

  return {
    type,
    paymentIntent,
    status,
    amountTotal: formatAmountFromStripe(
      amount_total,
      display_items[0].currency || "usd"
    ),
    customerName,
    customerEmail,
    shippingAddress: { name, line1, line2, city, postCode, country },
    orderItems,
  }
}
