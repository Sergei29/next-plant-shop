// Option-2: Fetch data on client
// from our internal api route
import { useEffect, useState } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import axios from "axios"
import Title from "../components/Title"
import { ProductShort } from "../types"

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<ProductShort[]>([])

  useEffect(() => {
    let mounted = true
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get<ProductShort[]>("/api/products")
        if (mounted) {
          setLoading(false)
          setProducts(data)
        }
      } catch (error) {
        if (mounted) setLoading(false)
        // some err handling
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
