import React, { ComponentPropsWithoutRef } from "react"

type Props = {} & Omit<ComponentPropsWithoutRef<"input">, "type">

/**
 * @description cart item quantity display
 * @param {Object} props component props
 * @returns {JSX.Element} markup for quantity
 */
const QuantityDisplay = ({ ...restInputProps }: Props): JSX.Element => (
  <span className=" flex flex-col items-center">
    <input
      type="number"
      className="w-16 px-1 border rounded "
      {...restInputProps}
    />
  </span>
)

export default QuantityDisplay
