import { NextApiHandler } from "next"
import cookie from "cookie"
import { SignInResponse } from "../../types"
import { CMS_API } from "../../constants"
import { fetchData, getErrorMessage, ApiError } from "../../lib"

type ReturnType = { id: number; name: string } | { error: { message: string } }

const handleRegister: NextApiHandler<ReturnType> = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end()
    return
  }
  const { username, email, password } = req.body

  try {
    const {
      jwt,
      user: { id, username: name },
    } = await fetchData<SignInResponse>(`${CMS_API}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { username, email, password },
    })
    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", jwt, {
          path: "/api", // cookie accessible for /api paths only
          httpOnly: true, // can be read by http requests only ( security feature ), but cookie cannot be read on browser
        })
      )
      .json({ id, name })
  } catch (error) {
    const message = getErrorMessage(error)
    const status = (error as ApiError).status || 401
    res.status(status).json({ error: { message } })
  }
}

export default handleRegister
