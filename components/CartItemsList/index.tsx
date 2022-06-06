import React from "react"
import { Cart } from "../../types"
import { displayPrice } from "../../lib"
import QuantityDisplay from "../QuantityDisplay"

type Props = {
  cart?: Cart
  loading: boolean
  error: string | null
}

const CartItemsList = ({ cart, loading, error }: Props): JSX.Element => {
  const getQuantityHandler =
    (itemId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      const newQuantity = parseInt(value, 10)
      console.log({ itemId, newQuantity })
    }

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
        {cart &&
          cart.items.map(
            ({ id, quantity, productTitle, productPrice, total }) => (
              <tr key={id} className="flex gap-4">
                <td className="text-left min-w-[250px]">{productTitle}</td>
                <td className="text-right min-w-[70px]">
                  {displayPrice(productPrice)}
                </td>
                <td className="text-right min-w-[100px]">
                  <QuantityDisplay
                    value={quantity}
                    onChange={getQuantityHandler(id)}
                    min={0}
                    max={50}
                  />
                </td>
                <td className="text-right min-w-[100px]">
                  {displayPrice(total)}
                </td>
              </tr>
            )
          )}
      </tbody>
      {cart && (
        <tfoot>
          <tr className="flex gap-4 justify-between">
            <td>Total</td>
            <td className="font-semibold">{displayPrice(cart.total)}</td>
          </tr>
        </tfoot>
      )}
    </table>
  )
}

export default CartItemsList
