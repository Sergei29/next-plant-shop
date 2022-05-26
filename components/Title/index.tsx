import React, { ComponentPropsWithoutRef } from "react"

type Props = {
  children: React.ReactNode
} & ComponentPropsWithoutRef<"h1">

const Title = ({ children, className, ...restHeadingProps }: Props) => (
  <h1 className={"text-2xl pb-4 " + className} {...restHeadingProps}>
    {children}
  </h1>
)

export default Title
