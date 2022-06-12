import React, { useState, useEffect, useRef } from "react"
import { useMutation } from "react-query"
import Stripe from "stripe"
import { fetchData, getErrorMessage } from "../lib"
import { getStripe } from "../lib/stripe"
import { Cart, DeliveryAddressType } from "../types"

type CheckoutInput = {
  cart: Cart
  address: DeliveryAddressType
}

export const useCheckout = () => {
  const [loading, setLoading] = useState(false)
  const [stripeErrorMessage, setStripeErrorMessage] = useState<null | string>(
    null
  )
  const statusRef = useRef({ willUnmount: false })

  const {
    mutateAsync,
    data,
    isError: isSessionError,
    error: sessionError,
  } = useMutation(async (input: CheckoutInput) =>
    fetchData<Stripe.Checkout.Session>("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...input },
    })
  )

  const handleSubmitPayment = async (checkoutData: CheckoutInput) => {
    // Create a Checkout Session.
    setLoading(true)
    setStripeErrorMessage(null)
    const session = await mutateAsync(checkoutData)

    if (isSessionError && !statusRef.current.willUnmount) {
      setLoading(false)
      setStripeErrorMessage(getErrorMessage(sessionError))
      return
    }

    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: session.id,
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error.message && !statusRef.current.willUnmount) {
      setStripeErrorMessage(error.message)
    }
    !statusRef.current.willUnmount && setLoading(false)
  }

  useEffect(() => {
    const surrentStatus = statusRef.current
    return () => {
      surrentStatus.willUnmount = true
    }
  }, [])

  return {
    createCheckoutSession: mutateAsync,
    handleSubmitPayment,
    checkoutSession: data,
    loading,
    error: stripeErrorMessage,
  }
}
