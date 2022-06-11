import React from "react"
import Title from "../Title"
import NavBar from "../NavBar"

type Props = {
  children: React.ReactNode
}

/**
 * @description page container component
 * @param {React.ReactNode} children nested children components
 * @returns {JSX.Element} page markup, header and main
 */
const PageContainer = ({ children }: Props): JSX.Element => (
  <>
    <header>
      <NavBar />
    </header>
    <main className="px-6 py-4">{children}</main>
  </>
)

PageContainer.Title = Title

export default PageContainer
