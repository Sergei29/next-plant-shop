import { NextApiHandler } from "next"
import { ProductShort } from "../../../types"
import { getProducts } from "../../../lib"

const handler: NextApiHandler<ProductShort[]> = async (req, res) => {
  const products = await getProducts()
  res.status(200).json(products)
}

export default handler
