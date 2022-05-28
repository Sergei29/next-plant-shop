import axios from "axios"
import { Product, ApiPayloadProductsList, ProductShort } from "../types"

const STRAPI_API = "http://localhost:1337/api"

export const formatProductsApiPayload = (
  apiPayload: ApiPayloadProductsList
): Product[] =>
  apiPayload.data.map(({ id, attributes }) => ({
    id,
    ...attributes,
    picture: {
      id: attributes.picture.data.id,
      ...attributes.picture.data.attributes,
    },
  }))

const stripProduct = ({ id, title, ...rest }: Product): ProductShort => ({
  id,
  title,
})

export const getProducts = async () => {
  let products: ProductShort[] = []
  try {
    const { data } = await axios.get<ApiPayloadProductsList>(
      `${STRAPI_API}/products?populate=*`
    )
    products = formatProductsApiPayload(data).map(stripProduct)
  } catch (error) {
    console.warn((error as Error).message || "Faild fetch products.")
  } finally {
    return products
  }
}
