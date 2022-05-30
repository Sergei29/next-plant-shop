import React, { ComponentProps } from "react"
import clsx from "clsx"

type Props = { label?: string } & ComponentProps<"label">

const Field = ({
  children,
  label,
  className = "",
  ...restLabelProps
}: Props): JSX.Element => {
  return (
    <label className={clsx("block my-2", className)} {...restLabelProps}>
      {!!label && <span className="block text-sm text-gray-600">{label}</span>}
      {children}
    </label>
  )
}

export default Field
