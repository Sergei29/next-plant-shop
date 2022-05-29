import type { NextPage, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import Title from "../components/Title"
import { ProductShort } from "../types"
import { getProducts, ApiError } from "../lib"
import { REVALIDATE_PRODUCTS } from "../constants"

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

const Home: NextPage<PageProps> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Next Shop</title>
        <meta name="description" content="Next shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/products/${id}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default Home
