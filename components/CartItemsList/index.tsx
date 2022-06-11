import React from "react"
import { Cart } from "../../types"
import { displayPrice } from "../../lib"
import QuantityDisplay from "../QuantityDisplay"
import { useEditCart } from "../../hooks"

type Props = {
  cart?: Cart
  loading: boolean
  error: string | null
}

/**
 * @description cart items list
 * @param {Object} props component props
 * @returns {JSX.Element} markup for table listing all cart
 */
const CartItemsList = ({ cart, loading, error }: Props): JSX.Element => {
  const {
    handleChangeCartItem,
    loading: loadingEdit,
    error: errorEdit,
  } = useEditCart()

  /**
   * @description generate change quantity handler
   * @param {number} cartItemId cart itme ID
   * @param {number} productId product ID
   * @returns {Function} quantity handler function
   */
  const getQuantityHandler =
    (cartItemId: number, productId: number) =>
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      const newQuantity = parseInt(value, 10)
      await handleChangeCartItem({
        cartItemId,
        productId,
        newQuantity,
      })
    }

  if (loading) {
    return <p>loading your cart...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  return (
    <>
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
              ({
                id,
                quantity,
                productTitle,
                productPrice,
                total,
                productId,
              }) => (
                <tr key={id} className="flex gap-4">
                  <td className="text-left min-w-[250px]">{productTitle}</td>
                  <td className="text-right min-w-[70px]">
                    {displayPrice(productPrice)}
                  </td>
                  <td className="text-right min-w-[100px]">
                    <QuantityDisplay
                      value={quantity}
                      onChange={getQuantityHandler(id, productId)}
                      min={0}
                      max={50}
                      disabled={loadingEdit}
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
      {errorEdit && (
        <p className="text-sm text-red-700">Error occured, please, try again</p>
      )}
    </>
  )
}

export default CartItemsList
