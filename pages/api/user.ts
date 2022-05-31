import { NextApiHandler } from "next"
import { fetchData, getErrorMessage, ApiError } from "../../lib"
import { CMS_API } from "../../constants"
import { UserRaw, UserShort, ErrorResponse } from "../../types"

type ReturnType = UserShort | ErrorResponse

const handleUser: NextApiHandler<ReturnType> = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).end()
    return
  }
  const { jwt } = req.cookies
  if (!jwt) {
    res
      .status(401)
      .json({ error: { message: "Not authenticated. Please login first" } })
    return
  }

  try {
    const { id, username: name } = await fetchData<UserRaw>(
      `${CMS_API}/users/me`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )

    res.status(200).json({ id, name })
  } catch (error) {
    const message = getErrorMessage(error)
    const status = (error as ApiError).status || 401
    res.status(status).json({ error: { message } })
  }
}

export default handleUser
