import type { NextPage, GetStaticProps, GetStaticPaths } from "next"
import Head from "next/head"
import Image from "next/image"
import { ParsedUrlQuery } from "querystring"
import PageContainer from "../../components/PageContainer"
import Button from "../../components/Button"
import { REVALIDATE_PRODUCTS } from "../../constants"
import { Product } from "../../types"
import {
  getProductById,
  generateProductsStaticPaths,
  ApiError,
  displayPrice,
} from "../../lib"
import { useEditCart, useUser } from "../../hooks"

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

/**
 * @description next page component
 * @param {object} props page props
 * @returns {JSX.Element} product details page
 */
const ProductPage: NextPage<PageProps> = ({ product }) => {
  const user = useUser()
  const { handleAddProduct } = useEditCart()
  const handleAdd = () => {
    handleAddProduct({ productId: product.id })
  }
  return (
    <>
      <Head>
        <title>Next Shop | {product.title}</title>
        <meta name="description" content="Next shop, product page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <PageContainer.Title>{product.title}</PageContainer.Title>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:basis-1/2 lg:basis-1/3">
            <Image
              src={product.picture.url}
              alt={product.title}
              width={640}
              height={480}
            />
          </div>
          <div className="md:basis-1/2">
            <p className="text-sm">{product.description}</p>
            <p className="text-lg font-bold mt-2">
              {displayPrice(product.price)}
            </p>
            {user && (
              <Button className="my-2" onClick={handleAdd}>
                add to cart
              </Button>
            )}
          </div>
        </div>
      </PageContainer>
    </>
  )
}

export default ProductPage
