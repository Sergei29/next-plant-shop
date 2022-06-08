import {
  CartProduct,
  ApiCartPayloadType,
  CartItemRaw,
  CartItemFormatted,
  Cart,
} from "../types"

/**
 * @description util: strips product object from un-necessary properties
 * @param {number} id product ID
 * @param {object} attributes product data
 * @returns {object} only the necerssary product properties
 */
export const stripCartProduct = ({
  id,
  attributes: { title, price },
}: CartProduct) => ({ productId: id, productTitle: title, productPrice: price })

/**
 * @description util: strips cart-item object from un-necessary properties
 * @param {number} id cart-item ID
 * @param {object} attributes cart-item data
 * @returns {object} only the necerssary cart-item properties
 */
export const stripCartItem = ({
  id,
  attributes: { quantity, product },
}: CartItemRaw): CartItemFormatted => ({
  id,
  quantity,
  ...stripCartProduct(product.data),
  total: product.data.attributes.price * quantity,
})

/**
 * @description util: calculates total price of all items in the cart
 * @param {Array} cartItems cart-items list
 * @returns {number} total price
 */
export const getCartTotal = (cartItems: CartItemFormatted[]) =>
  cartItems.reduce((grandTotal, current) => (grandTotal += current.total), 0)

/**
 * @description util: formatting cart items
 * @param {Array} items list of cart items from CMS
 * @returns {Array}  list of cart items without possible duplicates
 */
export const formatCartItems = (
  items: CartItemFormatted[]
): CartItemFormatted[] => {
  const cache = items.reduce((cached, current) => {
    const { productId, quantity, total } = current
    if (!!cached[`${productId}`]) {
      const prevItem: CartItemFormatted = cached[`${productId}`]
      cached[`${productId}`] = {
        ...prevItem,
        quantity: prevItem.quantity + quantity,
        total: prevItem.total + total,
      }
    } else {
      cached[`${productId}`] = current
    }
    return cached
  }, {} as Record<string, CartItemFormatted>)
  return Object.values(cache)
}

/**
 * @description util: formatting cart payload received from CMS API
 * @param {object} data API response payload
 * @returns {object} formatted user's shopping cart
 */
export const formatCartPayload = ({ data }: ApiCartPayloadType): Cart => {
  const items = formatCartItems(data.map(stripCartItem))
  return {
    items,
    total: getCartTotal(items),
  }
}
