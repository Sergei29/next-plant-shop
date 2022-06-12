import React, { useState } from "react"
import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT, AMOUNT_STEP } from "../../constants"
import { formatAmountForDisplay } from "../../lib/stripe"
import { useCheckout } from "../../hooks"
import StripeTestCards from "./components/StripeTestCards"
import CustomDonationInput from "./components/CustomDonationInput"

type Props = {}

const CheckoutForm = ({}: Props): JSX.Element => {
  const [input, setInput] = useState({
    customDonation: Math.round(MAX_AMOUNT / AMOUNT_STEP),
  })
  const { handleSubmitPayment, loading, error } = useCheckout()

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    handleSubmitPayment(input.customDonation)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CustomDonationInput
          className="checkout-style"
          name={"customDonation"}
          value={input.customDonation}
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
          step={AMOUNT_STEP}
          currency={CURRENCY}
          onChange={handleInputChange}
        />
        <StripeTestCards />
        <button
          className="checkout-style-background"
          type="submit"
          disabled={loading}
        >
          Donate {formatAmountForDisplay(input.customDonation, CURRENCY)}
        </button>
      </form>
      {error && <p className="text-red-600 font-bold">{error}</p>}
    </>
  )
}

export default CheckoutForm
