import {
  Product,
  ApiPayloadProductsList,
  ProductShort,
  ApiPayloadProductDetails,
  ApiRawProduct,
  ImageData,
  ImageDataShort,
} from "../types"
import { CMS_API } from "../constants"
import { fetchData } from "./api"

/**
 * @description util: formatting the product payload received from CMS API
 * @param {number} id product ID
 * @param {object} attributes product info
 * @returns {object} formatted product, flattened structure, only necessary properties
 */
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

/**
 * @description util: format products list payload received from CMS API
 * @param {object} apiPayload products list API response payload
 * @returns {Array} formatted products list
 */
export const formatProductsApiPayload = (
  apiPayload: ApiPayloadProductsList
): Product[] => apiPayload.data.map(formatRawProduct)

/**
 * @description  util: strips image object from un-necessary properties
 * @param {object} imageData image info nested object
 * @returns {object} image data only necessary properties
 */
const stripPicture = ({ id, url }: ImageData): ImageDataShort => ({ id, url })

/**
 * @description  util: strips product object from un-necessary properties
 * @param {object} productData product info nested object
 * @returns {object} product data only necessary properties
 */
const stripProduct = ({
  id,
  title,
  price,
  picture,
}: Product): ProductShort => ({
  id,
  title,
  price,
  picture: stripPicture(picture),
})

/**
 * @description util: display user friendly price
 * @param {number} amount price amount
 * @param {string} currency currency ( optional, defaults to $ )
 * @returns {string} currency + price decimals display
 */
export const displayPrice = (amount: number, currency = "$") =>
  currency + amount.toFixed(2)

/**
 * @description fetching the products list from CMS API
 * @returns {Promise<Array>} promise resolving to a list of formatted products
 */
export const getProducts = async (): Promise<ProductShort[]> => {
  const productsRaw = await fetchData<ApiPayloadProductsList>(
    `${CMS_API}/products?populate=*`
  )
  return formatProductsApiPayload(productsRaw).map(stripProduct)
}

/**
 * @description fetching product by ID from CMS API
 * @param {string} id product ID ( numeric string value )
 * @returns {Promise<Object>} promise resolving to formatted product
 */
export const getProductById = async (id: string): Promise<Product> => {
  const productRaw = await fetchData<ApiPayloadProductDetails>(
    `${CMS_API}/products/${id}?populate=*`
  )
  return formatRawProduct(productRaw.data)
}

/**
 * @description generates product static paths for product pages
 * @returns {Promise<Object>} promise, resolving to the list of paths for SSG `getStaticPaths`
 */
export const generateProductsStaticPaths = async () => {
  const products = await getProducts()
  return products.map(({ id }) => ({
    params: { id: `${id}` },
  }))
}
