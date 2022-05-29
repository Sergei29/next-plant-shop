import {
  Product,
  ApiPayloadProductsList,
  ProductShort,
  ApiPayloadProductDetails,
  ApiRawProduct,
} from "../types"
import { CMS_API } from "../constants"
import { fetchData } from "./api"

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

export const getProducts = async (): Promise<ProductShort[]> => {
  const productsRaw = await fetchData<ApiPayloadProductsList>(
    `${CMS_API}/products?populate=*`
  )
  return formatProductsApiPayload(productsRaw).map(stripProduct)
}

export const getProductById = async (id: string): Promise<Product> => {
  const productRaw = await fetchData<ApiPayloadProductDetails>(
    `${CMS_API}/products/${id}?populate=*`
  )
  return formatRawProduct(productRaw.data)
}

export const generateProductsStaticPaths = async () => {
  const products = await getProducts()
  return products.map(({ id }) => ({
    params: { id: `${id}` },
  }))
}
