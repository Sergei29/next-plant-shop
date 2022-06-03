import { NextApiHandler } from "next"
import {
  fetchData,
  getErrorMessage,
  ApiError,
  formatCartPayload,
} from "../../lib"
import { CMS_API } from "../../constants"
import {
  UserRaw,
  UserShort,
  ErrorResponse,
  ApiCartPayloadType,
  CartItemFormatted,
} from "../../types"

type ReturnType = CartItemFormatted[] | ErrorResponse

const handleCart: NextApiHandler<ReturnType> = async (req, res) => {
  const { jwt } = req.cookies
  const userId = req.query.user

  if (!jwt) {
    res
      .status(401)
      .json({ error: { message: "Not authenticated. Please login first" } })
    return
  }
  if (!userId) {
    res.status(404).json({
      error: {
        message: "Missing query param with user id. /cart?user=<id>",
      },
    })
    return
  }
  const Authorization = `Bearer ${jwt}`

  if (req.method === "GET") {
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
      const message = getErrorMessage(error)
      const status = (error as ApiError).status || 401
      res.status(status).json({ error: { message } })
    }
  }
}

export default handleCart
