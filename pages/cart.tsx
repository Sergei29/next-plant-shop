import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import PageContainer from "../components/PageContainer"
import CartItemsList from "../components/CartItemsList"
import { useCartItems, useUser } from "../hooks"

type PageProps = {}

const CartPage: NextPage<PageProps> = ({}) => {
  const user = useUser()
  const { push } = useRouter()
  const { cartItems, isCartItemsLoading, cartItemsError } = useCartItems()

  useEffect(() => {
    if (!user) {
      push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <Head>
        <title>Next Shop | Cart</title>
        <meta name="description" content="Shopping cart page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <PageContainer.Title>Cart</PageContainer.Title>
        <CartItemsList
          items={cartItems}
          loading={isCartItemsLoading}
          error={cartItemsError}
        />
      </PageContainer>
    </>
  )
}

export default CartPage
