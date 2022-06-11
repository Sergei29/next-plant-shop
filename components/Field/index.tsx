import React, { ComponentProps } from "react"
import clsx from "clsx"

type Props = { label?: string } & ComponentProps<"label">

/**
 * @description input field form control
 * @param {Object} props component props
 * @returns {JSX.Element} markup for a basic form control
 */
const Field = ({
  children,
  label,
  className = "",
  ...restLabelProps
}: Props): JSX.Element => (
  <label className={clsx("block my-2", className)} {...restLabelProps}>
    {!!label && <span className="block text-sm text-gray-600">{label}</span>}
    {children}
  </label>
)

export default Field
