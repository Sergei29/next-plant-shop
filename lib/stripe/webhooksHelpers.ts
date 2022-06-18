import Stripe from "stripe"
import {
  StripeCheckoutSession,
  StripeEvent,
  StripeSessionSuccessFormatted,
  OrderType,
} from "../../types"
import { formatAmountFromStripe } from "./stripeHelpers"

const footer = `This is the TEST payment processed by https://next-plant-shop.vercel.app/  - created for trainig purposes. The user purchase data like email, name and address will be kept no longer than 12hours.`

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
    currency: display_items[0].currency || "usd",
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

export const formatSessionToOrder = ({
  paymentIntent: paymentIntentReference,
  currency,
  amountTotal,
  customerName,
  customerEmail,
  shippingAddress,
  orderItems,
}: StripeSessionSuccessFormatted): OrderType => ({
  fulfilled: false,
  paymentIntentReference,
  currency,
  amountTotal,
  customerName,
  customerEmail,
  shippingAddress,
  orderItems,
})

export const getPaymentSuccessEmailContent = ({
  paymentIntent,
  currency,
  amountTotal,
  customerName,
  customerEmail,
  shippingAddress: { name, line1, line2, city, postCode, country },
  orderItems,
}: StripeSessionSuccessFormatted) => {
  const heading = `<h1>Congratulations ${customerName}! </h1>`
  const subHeading = `<h2>Your TEST purchase has been completed!</h2>`
  const intro = `<p>amount paid: ${currency} ${amountTotal} </p>
<p>Your TEST payment reference is ${paymentIntent}</p>
`
  const shippingAddessContent = `
<h3>Delivery address</h3>
<p>${name}</p>
<p>${line1}\n${line2}</p>
<p>${city}, ${postCode}</p>
<p>${country}</p>
`
  const orderItemsContent = orderItems.reduce((htmlContent, current) => {
    const { title, quantity, price } = current
    const line = `<p>${title}     ${quantity}     ${currency}${price} </p>`
    return htmlContent + line
  }, "")

  return `
  ${heading}
  ${subHeading}
  ${intro}
  ${shippingAddessContent}
  <h4>Items ordered: </h4>
  ${orderItemsContent}
  ${footer}
  `
}
