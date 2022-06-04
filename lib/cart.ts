import {
  CartProduct,
  ApiCartPayloadType,
  CartItemRaw,
  CartItemFormatted,
  Cart,
} from "../types"

export const stripCartProduct = ({
  id,
  attributes: { title, price },
}: CartProduct) => ({ productId: id, productTitle: title, productPrice: price })

export const stripCartItem = ({
  id,
  attributes: { quantity, product },
}: CartItemRaw): CartItemFormatted => ({
  id,
  quantity,
  ...stripCartProduct(product.data),
  total: product.data.attributes.price * quantity,
})

export const getCartTotal = (cartItems: CartItemFormatted[]) =>
  cartItems.reduce((grandTotal, current) => (grandTotal += current.total), 0)

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

export const formatCartPayload = ({ data }: ApiCartPayloadType): Cart => {
  const items = formatCartItems(data.map(stripCartItem))
  return {
    items,
    total: getCartTotal(items),
  }
}
