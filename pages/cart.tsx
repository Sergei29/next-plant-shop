import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import PageContainer from "../components/PageContainer"
import CartItemsList from "../components/CartItemsList"
import Button from "../components/Button"
import { useCartItems, useUser, useCheckout } from "../hooks"

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
  const { handleSubmitPayment, loading, error } = useCheckout()

  const handleProceedToCheckout = () =>
    cart &&
    handleSubmitPayment({
      cart,
    })

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
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="lg:flex-1">
            <CartItemsList
              cart={cart}
              loading={isCartLoading}
              error={cartError}
            />
            {!!cart?.items.length && (
              <Button
                className="my-4"
                disabled={loading}
                onClick={handleProceedToCheckout}
              >
                proceed to checkout
              </Button>
            )}
          </div>
        </div>
      </PageContainer>
    </>
  )
}

export default CartPage
