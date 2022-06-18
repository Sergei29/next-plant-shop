import type { NextPage, GetStaticProps } from "next"
import Head from "next/head"
import { ProductShort } from "../types"
import { getProducts, ApiError } from "../lib"
import { REVALIDATE_PRODUCTS } from "../constants"
import ProductCard from "../components/ProductCard"
import PageContainer from "../components/PageContainer"
import { useCheckoutResult } from "../hooks"

type Props = {
  products: ProductShort[] | null
}

type PageProps = {
  products: ProductShort[]
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  try {
    const products = await getProducts()
    return {
      props: {
        products,
      },
      revalidate: REVALIDATE_PRODUCTS,
    }
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return {
        notFound: true,
      }
    }
    throw error
  }
}

/**
 * @description next page component
 * @param {object} props page props
 * @returns {JSX.Element} home page, products list
 */
const Home: NextPage<PageProps> = ({ products }) => {
  const status = useCheckoutResult()

  return (
    <>
      <Head>
        <title>Next Shop | Indoor Plants</title>
        <meta name="description" content="Next shop, homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <PageContainer.Title>Next Shop</PageContainer.Title>
        {status === "success" && <h3> Payment succeeded </h3>}
        {status === "cancel" && (
          <h3> Payment canceled. You have not been charged. </h3>
        )}
        <ul className="grid gap-4 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </PageContainer>
    </>
  )
}

export default Home
