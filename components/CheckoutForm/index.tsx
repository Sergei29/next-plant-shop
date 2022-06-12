import React, { useState, ComponentPropsWithoutRef } from "react"
import { CURRENCY } from "../../constants"
import { formatAmountForDisplay } from "../../lib/stripe"
import { useCheckout } from "../../hooks"
import { DeliveryAddressType, Cart } from "../../types"
import StripeTestCards from "./components/StripeTestCards"
import Input from "../Input"
import Field from "../Field"
import Button from "../Button"
import { handleValidateForm } from "./helpers"

const INITIAl_FORM_STATE = {
  name: "",
  street: "",
  postcode: "",
  city: "",
  email: "",
}

type Props = { cart: Cart } & ComponentPropsWithoutRef<"div">

const CheckoutForm = ({ cart, ...restDivProps }: Props): JSX.Element => {
  const [address, setAddress] =
    useState<DeliveryAddressType>(INITIAl_FORM_STATE)
  const { handleSubmitPayment, loading, error } = useCheckout()

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setAddress((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }))

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    handleSubmitPayment({
      address,
      cart,
    })
  }

  const isValid = handleValidateForm(address)

  return (
    <div {...restDivProps}>
      <form onSubmit={handleSubmit}>
        <h2>Delivery address</h2>
        <Field label="Name">
          <Input
            type="text"
            name="name"
            placeholder="Recipient name"
            required
            onChange={handleInputChange}
          />
        </Field>
        <Field label="Street">
          <Input
            type="text"
            name="street"
            placeholder="Street, house number, appartment"
            required
            onChange={handleInputChange}
          />
        </Field>
        <Field label="Postcode">
          <Input
            type="text"
            name="postcode"
            placeholder="Postcode"
            required
            onChange={handleInputChange}
          />
        </Field>
        <Field label="City">
          <Input
            type="text"
            name="city"
            placeholder="City/town"
            onChange={handleInputChange}
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            name="email"
            placeholder="Recipient email"
            required
            onChange={handleInputChange}
          />
        </Field>

        <StripeTestCards />
        <Button type="submit" disabled={!isValid || loading}>
          pay {formatAmountForDisplay(cart.total, CURRENCY)}
        </Button>
      </form>
      {error && <p className="text-red-600 font-bold">{error}</p>}
    </div>
  )
}

export default CheckoutForm
