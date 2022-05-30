import React, { forwardRef, ComponentProps } from "react"
import clsx from "clsx"

type Props = ComponentProps<"input">

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, Props>(
  ({ className = "", ...restInputProps }, ref) => (
    <input
      className={clsx("border rounded px-3 py-1 w-80", className)}
      ref={ref}
      {...restInputProps}
    />
  )
)

export default Input
