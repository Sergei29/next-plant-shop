import { NextApiHandler } from "next"
import cookie from "cookie"
import { fetchData, getErrorMessage, ApiError } from "../../../../lib"
import { SignInResponse } from "../../../../types"
import { CMS_API } from "../../../../constants"

type ReturnType = { id: number; name: string } | { error: { message: string } }

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
    const message = getErrorMessage(error)
    const status = (error as ApiError).status || 401
    res.status(status).json({ error: { message } })
  }
}

export default handleGoogleAuth
