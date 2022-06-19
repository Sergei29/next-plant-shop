import { NextApiHandler } from "next"
import { fetchData, processServerError } from "../../../lib"
import { CMS_API } from "../../../constants"

type ReturnType = {}

const handleDeleteMany: NextApiHandler<ReturnType> = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).end()
  }

  if (!req.cookies.jwt) {
    res
      .status(401)
      .json({ error: { message: "Not authenticated. Please login first" } })
    return
  }

  const ids = req.query.ids as string[]

  const { jwt } = req.cookies

  const Authorization = `Bearer ${jwt}`
  const headers = {
    Authorization,
  }

  try {
    const allPromises = ids.map((id) =>
      fetchData<any>(`${CMS_API}/cart-items/${id}`, {
        method: "DELETE",
        headers,
      })
    )
    const deleted = await Promise.all(allPromises)

    res.status(200).json({ deletedItems: deleted.map((item) => item.data.id) })
  } catch (error) {
    processServerError(error, res)
  }
}

export default handleDeleteMany
