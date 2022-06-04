import { NextApiHandler } from "next"
import cookie from "cookie"

type ReturnType = {}

const handleLogout: NextApiHandler<ReturnType> = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end()
    return
  }

  res
    .status(200)
    .setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", "", {
        path: "/api", // cookie accessible for /api paths only
        expires: new Date(0), // set this cookie as expired - date in the past
      })
    )
    .json({})
}

export default handleLogout
