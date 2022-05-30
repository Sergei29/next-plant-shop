import React, { ComponentProps } from "react"
import clsx from "clsx"

type Props = {} & ComponentProps<"button">

const Button = ({
  children,
  className = "",
  ...restButtonProps
}: Props): JSX.Element => {
  return (
    <button
      className={clsx(
        "bg-green-800 text-gray-100 hover:bg-green-700 active:bg-green-600 rounded w-max px-4 py-2",
        className
      )}
      {...restButtonProps}
    >
      {children}
    </button>
  )
}

export default Button
