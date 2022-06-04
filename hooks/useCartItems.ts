import { useQuery } from "react-query"
import { useUser } from "./useUser"
import { QUERY_KEY } from "../constants"
import { fetchData, getErrorMessage } from "../lib"
import { CartItemFormatted } from "../types"

export const useCartItems = () => {
  const user = useUser()
  const userId = user?.id
  const {
    data: cartItems,
    isLoading: isCartItemsLoading,
    isError: isCartItemsError,
    error,
    status: cartItemsStatus,
  } = useQuery(
    [QUERY_KEY.CART_ITEMS, userId],
    () => fetchData<CartItemFormatted[]>(`/api/cart?user=${userId}`),
    {
      enabled: !!userId,
    }
  )

  return {
    cartItems,
    isCartItemsLoading,
    isCartItemsError,
    cartItemsError: getErrorMessage(error),
    cartItemsStatus,
  }
}
