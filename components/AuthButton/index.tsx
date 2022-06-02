import React, { ComponentProps } from "react"
import clsx from "clsx"
import Link, { LinkProps } from "next/link"

type Props = {
  children: React.ReactNode
  className?: string
} & LinkProps

const AuthButton = ({
  children,
  className,
  ...restLinkProps
}: Props): JSX.Element => (
  <Link {...restLinkProps}>
    <a
      className={clsx(
        "text-sm bg-green-800 text-gray-100 hover:bg-green-700 active:bg-green-600 rounded w-max px-2 py-1 min-w-[278px]",
        className
      )}
    >
      {children}
    </a>
  </Link>
)

export default AuthButton
