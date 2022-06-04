import React from "react"
import { CartItemFormatted } from "../../types"
import { displayPrice, getCartTotal } from "../../lib"

type Props = {
  items?: CartItemFormatted[]
  loading: boolean
  error: string | null
}

const CartItemsList = ({ items, loading, error }: Props): JSX.Element => {
  if (loading) {
    return <p>loading your cart...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  return (
    <table>
      <thead>
        <tr className="flex gap-4 mb-2">
          <th className="text-left min-w-[250px]">Product</th>
          <th className="text-right min-w-[70px]">Price</th>
          <th className="text-right min-w-[100px]">Quantity</th>
          <th className="text-right min-w-[100px]">Total</th>
        </tr>
      </thead>
      <tbody>
        {items &&
          items.map(({ id, quantity, product, total }) => (
            <tr key={id} className="flex gap-4">
              <td className="text-left min-w-[250px]">{product.title}</td>
              <td className="text-right min-w-[70px]">
                {displayPrice(product.price)}
              </td>
              <td className="text-right min-w-[100px]">{quantity}</td>
              <td className="text-right min-w-[100px]">
                {displayPrice(total)}
              </td>
            </tr>
          ))}
      </tbody>
      {items && (
        <tfoot>
          <tr className="flex gap-4 justify-between">
            <td>Total</td>
            <td className="font-semibold">
              {displayPrice(getCartTotal(items))}
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  )
}

export default CartItemsList
