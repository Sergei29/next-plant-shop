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
}: CartProduct) => ({ id, title, price })

export const stripCartItem = ({
  id,
  attributes: { quantity, product },
}: CartItemRaw): CartItemFormatted => ({
  id,
  quantity,
  product: stripCartProduct(product.data),
  total: product.data.attributes.price * quantity,
})
export const getCartTotal = (cartItems: CartItemFormatted[]) =>
  cartItems.reduce((grandTotal, current) => (grandTotal += current.total), 0)

export const formatCartPayload = ({ data }: ApiCartPayloadType): Cart => {
  const items = data.map(stripCartItem)
  return {
    items,
    total: getCartTotal(items),
  }
}
