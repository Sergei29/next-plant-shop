import type { NextPage } from "next"
import Head from "next/head"
import { useEffect } from "react"
import { useQuery } from "react-query"
import PageContainer from "../components/PageContainer"
import { useUser } from "../hooks"
import { fetchData } from "../lib"
import { QUERY_KEY } from "../constants"
import { CartItemFormatted } from "../types"

type PageProps = {}

const CartPage: NextPage<PageProps> = ({}) => {
  const user = useUser()
  const userId = user?.id
  const { data, isLoading, isError, error } = useQuery(
    [QUERY_KEY.CART, userId],
    () => fetchData<CartItemFormatted>(`/api/cart?user=${userId}`),
    {
      enabled: !!userId,
    }
  )
  useEffect(() => {
    console.log({ data })
  }, [data])

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
