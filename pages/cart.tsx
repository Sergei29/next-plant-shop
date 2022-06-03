import type { NextPage } from "next"
import Head from "next/head"
import PageContainer from "../components/PageContainer"

type PageProps = {}

const CartPage: NextPage<PageProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Next Shop | Cart</title>
        <meta name="description" content="Shopping cart page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <PageContainer.Title>Cart</PageContainer.Title>
      </PageContainer>
    </>
  )
}

export default CartPage
