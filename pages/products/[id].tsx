import type { NextPage, GetStaticProps, GetStaticPaths } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import Title from "../../components/Title"
import { Product } from "../../types"
import { getProductById, generateProductsStaticPaths } from "../../lib"
import { REVALIDATE_PRODUCTS } from "../../constants"

type PageParams = {
  id: string
} & ParsedUrlQuery

type Props = {
  product: Product | null
}

type PageProps = {
  product: Product
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const paths = await generateProductsStaticPaths()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, PageParams> = async ({
  params,
}) => {
  const [maybeProduct] = await getProductById(params?.id as string)

  if (!maybeProduct) {
    return {
      props: { product: maybeProduct },
      redirect: 404,
    }
  }

  return {
    props: {
      product: maybeProduct,
    },
    revalidate: REVALIDATE_PRODUCTS,
  }
}

const ProductPage: NextPage<PageProps> = ({ product }) => {
  return (
    <>
      <Head>
        <title>Next Shop | Product</title>
        <meta name="description" content="Next shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-6 py-4">
        <Title>{product.title}</Title>
        <p>{product.description}</p>
      </main>
    </>
  )
}

export default ProductPage
