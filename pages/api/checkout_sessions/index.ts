import { NextApiHandler } from "next"
import Stripe from "stripe"
import {
  CURRENCY,
  MIN_AMOUNT,
  MAX_AMOUNT,
  STRIPE_SECRET_KEY,
} from "../../../constants"
import { formatAmountForStripe } from "../../../lib/stripe"

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
})

type ReturnType = {}

const handleCheckoutSession: NextApiHandler<ReturnType> = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end()
    return
  }
  const amount: number = req.body.amount

  try {
    /**
     * @description Validate the amount that was passed from the client.
     */
    if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
      throw new Error("Invalid amount.")
    }
    /**
     * @description Create Checkout Sessions from body params.
     */
    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "donate",
      payment_method_types: ["card"],
      line_items: [
        {
          name: "Custom amount donation",
          amount: formatAmountForStripe(amount, CURRENCY),
          currency: CURRENCY,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/donate-with-checkout`,
    }
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params)
    res.status(200).json(checkoutSession)
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error"
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}

export default handleCheckoutSession
