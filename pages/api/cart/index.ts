import { NextApiHandler } from "next"
import {
  fetchData,
  formatCartPayload,
  processServerError,
  stripCartItem,
} from "../../../lib"
import { CMS_API } from "../../../constants"
import {
  ErrorResponse,
  ApiCartPayloadType,
  ApiPostCartPayloadType,
  Cart,
  CartItemFormatted,
} from "../../../types"

type GetReturnType = Cart | ErrorResponse
type PostReturnType = CartItemFormatted | ErrorResponse

const handleGetCart: NextApiHandler<GetReturnType> = async (req, res) => {
  const { jwt } = req.cookies
  const userId = req.query.user
  if (!userId) {
    res.status(404).json({
      error: {
        message: "Missing query param with user id. /cart?user=<id>",
      },
    })
    return
  }
  const Authorization = `Bearer ${jwt}`
  const URL_GET_CART = `${CMS_API}/cart-items?populate[0]=user,product&filters[user][id][$eq]=${userId}`
  try {
    const cartPayload = await fetchData<ApiCartPayloadType>(URL_GET_CART, {
      method: "GET",
      headers: {
        Authorization,
      },
    })
    const cart = formatCartPayload(cartPayload)
    res.status(200).json(cart)
  } catch (error) {
    processServerError(error, res)
  }
}

const handlePostCart: NextApiHandler<PostReturnType> = async (req, res) => {
  const { productId, userId, quantity } = req.body
  const { jwt } = req.cookies
  if (!productId || !userId || !quantity) {
    res.status(404).json({
      error: {
        message:
          "Wrong data payload. required: { productId:number, userId:number, quantity:number }",
      },
    })
    return
  }
  const Authorization = `Bearer ${jwt}`
  const URL_POST_CART = `${CMS_API}/cart-items?populate[0]=user,product&filters[user][id][$eq]=${userId}`
  const data = {
    data: {
      product: productId,
      user: userId,
      quantity: quantity,
    },
  }

  try {
    const cartPayload = await fetchData<ApiPostCartPayloadType>(URL_POST_CART, {
      method: "POST",
      headers: {
        Authorization,
      },
      data,
    })
    const cartItem = stripCartItem(cartPayload.data)
    res.status(200).json(cartItem)
  } catch (error) {
    processServerError(error, res)
  }
}

const handleCart: NextApiHandler<GetReturnType | PostReturnType> = async (
  req,
  res
) => {
  if (!req.cookies.jwt) {
    res
      .status(401)
      .json({ error: { message: "Not authenticated. Please login first" } })
    return
  }

  switch (req.method) {
    case "GET":
      return handleGetCart(req, res)
    case "POST":
      return handlePostCart(req, res)
    default:
      return res.status(405).end()
  }
}

export default handleCart
