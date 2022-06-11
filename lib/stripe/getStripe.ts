import { Stripe, loadStripe } from "@stripe/stripe-js"
import { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } from "../../constants"

let stripePromise: Promise<Stripe | null>

/**
 * @description loading stripe instance, singleton to ensure we only instantiate Stripe once.
 * @returns {Promise<Stripe | null>} promise resolving to stripe instance if success
 */
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}
