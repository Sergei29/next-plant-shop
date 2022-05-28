import axios from "axios"
import {
  Product,
  ApiPayloadProductsList,
  ProductShort,
  ApiPayloadProductDetails,
  ApiRawProduct,
} from "../types"
import { STRAPI_API } from "../constants"

export const formatRawProduct = ({
  id,
  attributes,
}: ApiRawProduct): Product => ({
  id,
  ...attributes,
  picture: {
    id: attributes.picture.data.id,
    ...attributes.picture.data.attributes,
  },
})

export const formatProductsApiPayload = (
  apiPayload: ApiPayloadProductsList
): Product[] => apiPayload.data.map(formatRawProduct)

const stripProduct = ({ id, title }: Product): ProductShort => ({
  id,
  title,
})

export const getProducts = async (): Promise<
  [ProductShort[] | null, string | null]
> => {
  let products: ProductShort[] | null = null
  let error: string | null = null

  try {
    const { data } = await axios.get<ApiPayloadProductsList>(
      `${STRAPI_API}/products?populate=*`
    )
    products = formatProductsApiPayload(data).map(stripProduct)
  } catch (error) {
    products = null
    error = (error as Error).message || "Failed fetch products."
    console.warn(error)
  } finally {
    return [products, error]
  }
}

export const getProductById = async (
  id: string
): Promise<[Product | null, string | null]> => {
  let product: Product | null = null
  let error: string | null = null

  try {
    const { data } = await axios.get<ApiPayloadProductDetails>(
      `${STRAPI_API}/products/${id}?populate=*`
    )
    product = formatRawProduct(data.data)
  } catch (error) {
    product = null
    error = (error as Error).message || `Failed fetch product id: ${id}`
    console.warn(error)
  } finally {
    return [product, error]
  }
}

export const generateProductsStaticPaths = async () => {
  const [products] = await getProducts()
  if (!products) {
    return []
  }

  return products.map(({ id }) => ({
    params: { id: `${id}` },
  }))
}
