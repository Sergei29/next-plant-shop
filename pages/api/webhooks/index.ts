import { NextApiHandler } from "next"
import Stripe from "stripe"
import Cors from "micro-cors"
import { buffer } from "micro"
import {
  STRIPE_WEBHOOK_SECRET,
  STRIPE_SECRET_KEY,
  CMS_API,
} from "../../../constants"
import { fetchData } from "../../../lib"
import {
  formatCheckoutSessionCompleted,
  formatSessionToOrder,
  getPaymentSuccessEmailContent,
} from "../../../lib/stripe"
import { StripeCheckoutSession, StripeEvent } from "../../../types"

export const config = {
  api: {
    bodyParser: false,
  },
}
const cors = Cors({
  allowMethods: ["POST", "HEAD"],
})

/**
 * @description https://github.com/stripe/stripe-node#configuration
 */
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
})

type ReturnType = {}

const handleStripeWebhook: NextApiHandler<ReturnType> = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    res.status(405).end()
    return
  }
  const bufferedReq = await buffer(req)
  const signature = req.headers["stripe-signature"]
  const webhookSecret = STRIPE_WEBHOOK_SECRET
  let event: Record<string, any> | null = null

  try {
    if (!signature || !webhookSecret) return
    event = stripe.webhooks.constructEvent(
      bufferedReq,
      signature,
      webhookSecret
    )
  } catch (error) {
    const message = `Webhook error: ${(error as Error).message}`
    console.log(message)
    res.status(400).send(message)
    return
  }

  if (event.type === "checkout.session.completed") {
    const sessionFormatted = formatCheckoutSessionCompleted(
      event as StripeEvent<StripeCheckoutSession>
    )
    const newOrder = formatSessionToOrder(sessionFormatted)
    const data = {
      data: newOrder,
    }

    try {
      fetchData(`${CMS_API}/orders`, {
        method: "POST",
        data,
      })
    } catch (error) {
      const message = (error as Error).message
      console.log(`Error creating new order: ${message}`)
    }

    try {
      fetchData(`${CMS_API}/email`, {
        method: "POST",
        data: {
          to: sessionFormatted.customerEmail,
          subject: `TEST payment succeeded on next-plant-shop`,
          html: getPaymentSuccessEmailContent(sessionFormatted),
        },
      })
    } catch (error) {
      const message = (error as Error).message
      console.log(`Error creating new order: ${message}`)
    }
  }

  res.status(200).send("ok")
}

export default cors(handleStripeWebhook as any)
