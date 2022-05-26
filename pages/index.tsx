import type { NextPage } from "next"
import Head from "next/head"
import Title from "../components/Title"

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
        <p>[TODO: display products]</p>
      </main>
    </>
  )
}

export default Home
