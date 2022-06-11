import { NextApiHandler } from "next"
import { fetchData, processServerError, stripCartItem } from "../../../lib"
import { CMS_API } from "../../../constants"
import {
  ErrorResponse,
  ApiPostCartPayloadType,
  CartItemFormatted,
} from "../../../types"

type DeleteReturnType = { id: number }
type ReturnType = CartItemFormatted | DeleteReturnType | ErrorResponse

/**
 * @description update existing cart item handler
 * @param {object} req request obj
 * @param {object} res response obj
 * @returns {Promise<undefined>} void promise, api response
 */
const handleEditCartItem: NextApiHandler<ReturnType> = async (req, res) => {
  const { jwt } = req.cookies
  const itemId = req.query.id as string
  const { productId, userId, quantity } = req.body
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
  const URL_PUT_CART = `${CMS_API}/cart-items/${itemId}?populate[0]=user,product`

  const data = {
    data: {
      product: productId,
      user: userId,
      quantity: quantity,
    },
  }

  try {
    const cartItemPayload = await fetchData<ApiPostCartPayloadType>(
      URL_PUT_CART,
      {
        method: "PUT",
        headers: {
          Authorization,
        },
        data,
      }
    )
    const cartItem = stripCartItem(cartItemPayload.data)
    res.status(200).json(cartItem)
  } catch (error) {
    processServerError(error, res)
  }
}

/**
 * @description delete existing cart item handler
 * @param {object} req request obj
 * @param {object} res response obj
 * @returns {Promise<undefined>} void promise, api response
 */
const handleDeleteCartItem: NextApiHandler<DeleteReturnType> = async (
  req,
  res
) => {
  const { jwt } = req.cookies
  const itemId = req.query.id as string

  const Authorization = `Bearer ${jwt}`
  const URL_DELETE_CART = `${CMS_API}/cart-items/${itemId}`

  try {
    const cartItemDeleted = await fetchData<Record<string, any>>(
      URL_DELETE_CART,
      {
        method: "DELETE",
        headers: {
          Authorization,
        },
      }
    )
    res.status(200).json({ id: cartItemDeleted.data.id as number })
  } catch (error) {
    processServerError(error, res)
  }
}

/**
 * @description existing cart item handler
 * @param {object} req request obj
 * @param {object} res response obj
 * @returns {Promise<undefined>} void promise, api response
 */
const handleCartItem: NextApiHandler<ReturnType> = async (req, res) => {
  if (!req.cookies.jwt) {
    res
      .status(401)
      .json({ error: { message: "Not authenticated. Please login first" } })
    return
  }

  switch (req.method) {
    case "PUT":
      return handleEditCartItem(req, res)

    case "DELETE":
      return handleDeleteCartItem(req, res)

    default:
      return res.status(405).end()
  }
}

export default handleCartItem
