import { NextApiHandler } from "next"
import Stripe from "stripe"
import { MIN_AMOUNT, MAX_AMOUNT, STRIPE_SECRET_KEY } from "../../../constants"
import { formatCartItemsForStripe } from "../../../lib/stripe"
import { processServerError } from "../../../lib"
import { ErrorResponse, Cart, DeliveryAddressType } from "../../../types"

/**
 * @description https://github.com/stripe/stripe-node#configuration
 */
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
})

type ReturnType = Stripe.Checkout.Session | ErrorResponse

/**
 * @description user checkout session handler
 * @param {object} req request obj
 * @param {object} res response obj
 * @returns {Promise<undefined>} void promise, api response, creates Stripe payment session, redirects app to either success page or error page
 */
const handleCheckoutSession: NextApiHandler<ReturnType> = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end()
    return
  }
  const cart: Cart = req.body.cart
  const address: DeliveryAddressType = req.body.address

  /**
   * @description Validate the checkout payload passed from the client.
   */
  if (!cart || !address) {
    res.status(401).json({
      error: {
        message:
          "Invalid payload. Expected { cart:<ShoppingCart>, address:<eDeliveryAddress> }",
      },
    })
    return
  }
  if (!(cart.total >= MIN_AMOUNT && cart.total <= MAX_AMOUNT)) {
    res.status(401).json({ error: { message: "Invalid amount." } })
    return
  }

  try {
    /**
     * @description Create Checkout Sessions from body params.
     */
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: formatCartItemsForStripe(cart.items),
      success_url: `${req.headers.origin}?status=success`,
      cancel_url: `${req.headers.origin}/cart?status=cancel`,
      payment_intent_data: {
        receipt_email: address.email,
      },
    }
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params)

    console.log({ address })

    res.status(200).json(checkoutSession)
  } catch (err) {
    processServerError(err, res)
  }
}

export default handleCheckoutSession
