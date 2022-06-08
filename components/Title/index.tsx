import React, { ComponentPropsWithoutRef } from "react"

type Props = {
  children: React.ReactNode
} & ComponentPropsWithoutRef<"h1">

/**
 * @description page title component
 * @param {Object} props component props
 * @returns {JSX.Element} markup for page title
 */
const Title = ({
  children,
  className,
  ...restHeadingProps
}: Props): JSX.Element => (
  <h1 className={"text-2xl pb-4 " + className} {...restHeadingProps}>
    {children}
  </h1>
)

export default Title
