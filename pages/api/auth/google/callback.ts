import { NextApiHandler } from "next"
import cookie from "cookie"
import { fetchData, processServerError } from "../../../../lib"
import { SignInResponse, UserShort, ErrorResponse } from "../../../../types"
import { CMS_API } from "../../../../constants"

type ReturnType = UserShort | ErrorResponse

/**
 * @description google logic via strapi callback handler
 * @param {object} req request obj
 * @param {object} res response obj
 * @returns {Promise<undefined>} void promise, api response
 */
const handleGoogleAuth: NextApiHandler<ReturnType> = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end()
    return
  }

  try {
    const { jwt, user } = await fetchData<SignInResponse>(
      `${CMS_API}/auth/google/callback?access_token=${req.body.access_token}`
    )

    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", jwt, {
          path: "/api", // cookie accessible for /api paths only
          httpOnly: true, // can be read by http requests only ( security feature ), but cookie cannot be read on browser
        })
      )
      .json({ id: user.id, name: user.username })
  } catch (error) {
    processServerError(error, res)
  }
}

export default handleGoogleAuth
