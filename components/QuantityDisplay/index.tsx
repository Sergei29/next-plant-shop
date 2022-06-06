import React, { ComponentPropsWithoutRef } from "react"

type Props = {} & Omit<ComponentPropsWithoutRef<"input">, "type">
const QuantityDisplay = ({ ...restInputProps }: Props): JSX.Element => {
  return (
    <span className=" flex flex-col items-center">
      <input
        type="number"
        className="w-16 px-1 border rounded "
        {...restInputProps}
      />
    </span>
  )
}

export default QuantityDisplay
