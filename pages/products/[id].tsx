import type { NextPage, GetStaticProps, GetStaticPaths } from "next"
import Head from "next/head"
import { ParsedUrlQuery } from "querystring"
import Title from "../../components/Title"
import { Product } from "../../types"
import {
  getProductById,
  generateProductsStaticPaths,
  ApiError,
} from "../../lib"
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
    /**
     * @description `fallback: "blocking"` if the new path added by BE - it will re-generate paths to include new path ( https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking)
     */
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps<Props, PageParams> = async ({
  params,
}) => {
  try {
    const product = await getProductById(params?.id as string)

    return {
      props: {
        product,
      },
      /**
       * @description make incremental static page regenaration at the interval specified ( sec )
       */
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
