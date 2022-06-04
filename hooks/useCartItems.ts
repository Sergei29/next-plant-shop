import { useQuery } from "react-query"
import { useUser } from "./useUser"
import { QUERY_KEY } from "../constants"
import { fetchData, getErrorMessage } from "../lib"
import { Cart } from "../types"

export const useCartItems = () => {
  const user = useUser()
  const userId = user?.id
  const {
    data: cart,
    isLoading: isCartLoading,
    isError: isCartError,
    error,
    status: cartStatus,
  } = useQuery(
    [QUERY_KEY.CART_ITEMS, userId],
    () => fetchData<Cart>(`/api/cart?user=${userId}`),
    {
      enabled: !!userId,
    }
  )

  return {
    cart,
    isCartLoading,
    isCartError,
    cartError: getErrorMessage(error),
    cartStatus,
  }
}
