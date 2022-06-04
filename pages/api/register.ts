import { NextApiHandler } from "next"
import cookie from "cookie"
import { SignInResponse, UserShort, ErrorResponse } from "../../types"
import { CMS_API } from "../../constants"
import { fetchData, processServerError } from "../../lib"

type ReturnType = UserShort | ErrorResponse

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
    processServerError(error, res)
  }
}

export default handleRegister
