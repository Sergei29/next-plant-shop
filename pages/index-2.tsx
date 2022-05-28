// Option-2: Fetch data on client
import { useEffect, useState } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import Title from "../components/Title"
import { ProductShort } from "../types"
import { getProducts } from "../lib"

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<ProductShort[]>([])

  useEffect(() => {
    let mounted = true
    const fetchProducts = async () => {
      setLoading(true)
      const received = await getProducts()
      if (mounted) {
        setLoading(false)
        setProducts(received)
      }
    }
    fetchProducts()

    return () => {
      mounted = false
    }
  }, [])

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
          {loading ? (
            <li>loading...</li>
          ) : (
            products.map(({ id, title }) => <li key={id}>{title}</li>)
          )}
        </ul>
      </main>
    </>
  )
}

export default Home
