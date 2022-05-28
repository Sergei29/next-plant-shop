// Option-1: Fetch data on server ( getStaticProps )

import type { NextPage, GetStaticProps } from "next"
import Head from "next/head"
import Title from "../components/Title"
import { ProductShort } from "../types"
import { getProducts } from "../lib"

type Props = {
  products: ProductShort[]
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  let products: ProductShort[] = await getProducts()
  return {
    props: {
      products,
    },
  }
}

const Home: NextPage<Props> = ({ products }) => {
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
            <li key={id}>{title}</li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default Home
