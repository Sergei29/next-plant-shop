// Option-2: Fetch data on client

import type { NextPage } from "next"
import Head from "next/head"
import Title from "../components/Title"

const products = [
  { id: 1, title: "Product One" },
  { id: 2, title: "Product Two" },
  { id: 3, title: "Product Three" },
]

const Home: NextPage = () => {
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
