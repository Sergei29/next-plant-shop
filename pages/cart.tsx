import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import PageContainer from "../components/PageContainer"
import CartItemsList from "../components/CartItemsList"
import Button from "../components/Button"
import { useCartItems, useUser } from "../hooks"

type PageProps = {}

/**
 * @description next page component
 * @param {object} props page props
 * @returns {JSX.Element} shopping cart page
 */
const CartPage: NextPage<PageProps> = ({}) => {
  const user = useUser()
  const { push } = useRouter()
  const { cart, isCartLoading, cartError } = useCartItems()

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
        <CartItemsList cart={cart} loading={isCartLoading} error={cartError} />
        <Button className="my-4" onClick={() => push("/checkout")}>
          checkout
        </Button>
      </PageContainer>
    </>
  )
}

export default CartPage
