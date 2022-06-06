import { useMutation, useQueryClient } from "react-query"
import { useUser } from "./useUser"
import {
  CartItemRequestPayload,
  CartItemUpdatePayload,
  CartItemFormatted,
  Cart,
} from "../types"
import { fetchData, getErrorMessage } from "../lib"
import { QUERY_KEY } from "../constants"
import { useCartItems } from "./useCartItems"

type EditCartProductArgs = {
  productId: number
  quantity?: number
}

type EditCartItemArgs = {
  cartItemId: number
  productId: number
  newQuantity: number
}

const findCartItem = (productId: number, cart?: Cart) => {
  if (!cart) return null
  return cart.items.find((item) => item.productId === productId) || null
}

const getAllErrors = (
  errorCreate: unknown,
  errorUpdate: unknown,
  errorDelete: unknown
) => {
  if (!!errorCreate) {
    return getErrorMessage(errorCreate)
  }
  if (!!errorUpdate) {
    return getErrorMessage(errorUpdate)
  }
  if (!!errorDelete) {
    return getErrorMessage(errorDelete)
  }
  return null
}

export const useEditCart = () => {
  const user = useUser()
  const queryClient = useQueryClient()
  const { cart } = useCartItems()

  const {
    mutateAsync: createNewItemAsync,
    isLoading: createNewLoading,
    error: createNewItemError,
  } = useMutation(
    ({ productId, userId, quantity }: CartItemRequestPayload) =>
      fetchData<CartItemFormatted>(`/api/cart`, {
        method: "POST",
        data: { productId, userId, quantity },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.CART_ITEMS) // refetching 'cartItems'
      },
    }
  )

  const {
    mutateAsync: updateItemAsync,
    isLoading: updateLoading,
    error: updateError,
  } = useMutation(
    ({ productId, userId, quantity, cartItemId }: CartItemUpdatePayload) =>
      fetchData<CartItemFormatted>(`/api/cart/${cartItemId}`, {
        method: "PUT",
        data: { productId, userId, quantity },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.CART_ITEMS) // refetching 'cartItems'
      },
    }
  )

  const {
    mutateAsync: deleteItemAsync,
    isLoading: deleteLoading,
    error: deleteError,
  } = useMutation(
    ({ cartItemId }: { cartItemId: number }) =>
      fetchData<CartItemFormatted>(`/api/cart/${cartItemId}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.CART_ITEMS) // refetching 'cartItems'
      },
    }
  )
  const loading = updateLoading || createNewLoading || deleteLoading

  const handleAddProduct = async ({
    productId,
    quantity = 1,
  }: EditCartProductArgs) => {
    if (!user) return
    const cartItem = findCartItem(productId, cart)
    if (!cartItem) {
      await createNewItemAsync({ productId, userId: user.id, quantity })
      return
    }
    await updateItemAsync({
      productId,
      userId: user.id,
      quantity: cartItem.quantity + quantity,
      cartItemId: cartItem.id,
    })
  }

  const handleRemoveProduct = async ({
    productId,
    quantity = 1,
  }: EditCartProductArgs) => {
    const cartItem = findCartItem(productId, cart)
    if (!user || !cartItem) return
    const newQuantity = cartItem.quantity - quantity

    if (newQuantity < 1) {
      await deleteItemAsync({ cartItemId: cartItem.id })
      return
    }

    await updateItemAsync({
      productId,
      userId: user.id,
      quantity: newQuantity,
      cartItemId: cartItem.id,
    })
  }

  const handleChangeCartItem = async ({
    cartItemId,
    productId,
    newQuantity,
  }: EditCartItemArgs) => {
    if (!user) return
    if (newQuantity < 1) {
      await deleteItemAsync({ cartItemId })
      return
    }
    await updateItemAsync({
      productId,
      userId: user.id,
      quantity: newQuantity,
      cartItemId,
    })
  }

  return {
    handleAddProduct,
    handleRemoveProduct,
    handleChangeCartItem,
    loading,
    error: getAllErrors(createNewItemError, updateError, deleteError),
  }
}
