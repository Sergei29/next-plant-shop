import { NextApiHandler } from "next"
import Stripe from "stripe"
import { buffer } from "micro"
import {
  STRIPE_WEBHOOK_SECRET,
  STRIPE_SECRET_KEY,
  CMS_API,
} from "../../../constants"
import { fetchData } from "../../../lib"
import { formatCheckoutSessionCompleted } from "../../../lib/stripe"
import { StripeCheckoutSession, StripeEvent } from "../../../types"

export const config = {
  api: {
    bodyParser: false,
  },
}
/**
 * @description https://github.com/stripe/stripe-node#configuration
 */
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
})

type ReturnType = {}

const handleStripeWebhook: NextApiHandler<ReturnType> = async (req, res) => {
  if (req.method !== "POST") {
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

  // TODO event received if event.type === 'payment_intent.succeeded'
  // 1. create an order on STRAPI API
  // 2. email the sustomer success email

  if (event.type === "checkout.session.completed") {
    console.log("event.constructor.name: ", event.constructor.name)

    console.log(
      "formatted response: ",
      formatCheckoutSessionCompleted(
        event as StripeEvent<StripeCheckoutSession>
      )
    )
  }

  // try {
  //   fetchData(`${CMS_API}/email`,{
  //     method: 'POST',
  //     data:{
  //       to: ''
  //     }
  //   })
  // } catch (error) {

  // }

  res.status(200).end()
}

export default handleStripeWebhook
