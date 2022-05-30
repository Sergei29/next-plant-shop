import React from "react"
import Title from "../Title"

type Props = {
  children: React.ReactNode
}

const PageContainer = ({ children }: Props): JSX.Element => {
  return <main className="px-6 py-4">{children}</main>
}

PageContainer.Title = Title

export default PageContainer
