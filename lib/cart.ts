import {
  CartProduct,
  CartUser,
  ApiCartPayloadType,
  CartItemRaw,
} from "../types"

export const stripCartProduct = ({
  id,
  attributes: { title, price },
}: CartProduct) => ({ id, title, price })

export const stripCartUser = ({
  id,
  attributes: { username: name, email, provider },
}: CartUser) => ({ id, name, email, provider })

export const stripCartItem = ({
  id,
  attributes: { quantity, user, product },
}: CartItemRaw) => ({
  id,
  quantity,
  user: stripCartUser(user.data),
  product: stripCartProduct(product.data),
})

export const formatCartPayload = ({ data }: ApiCartPayloadType) =>
  data.map(stripCartItem)
