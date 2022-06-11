import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useCartItems, useUser } from "../hooks"
import PageContainer from "../components/PageContainer"

type PageProps = {}

const CheckoutPage: NextPage<PageProps> = ({}) => {
  const user = useUser()
  const { push } = useRouter()
  const { cart, isCartLoading, cartError } = useCartItems()

  return (
    <>
      <Head>
        <title>Next Shop | Checkout</title>
        <meta name="description" content="Next page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <PageContainer.Title>Checkout page</PageContainer.Title>
      </PageContainer>
    </>
  )
}

export default CheckoutPage
