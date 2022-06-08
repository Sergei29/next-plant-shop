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

/**
 * @description util: find cart item by product ID
 * @param {number} productId product ID
 * @param {Object|undefined} cart shopping cart object ( can be `undefined` )
 * @returns {Object|null} cart item found or `null`
 */
const findCartItem = (productId: number, cart?: Cart) => {
  if (!cart) return null
  return cart.items.find((item) => item.productId === productId) || null
}

/**
 * @description util: aggregates all possible `catch` block errors into one error message
 * @param {unknown} errorCreate create cart item error
 * @param {unknown} errorUpdate update cart item eror
 * @param {unknown} errorDelete delete cart item error
 * @returns {string|null} error message or `null` if nothing
 */
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

/**
 * @description edit shopping cart custom hook
 * @returns {Object} edit cart handler functions and status properties
 */
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
        /**
         * @description refetching 'cartItems'
         */
        queryClient.invalidateQueries(QUERY_KEY.CART_ITEMS)
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
        /**
         * @description refetching 'cartItems'
         */
        queryClient.invalidateQueries(QUERY_KEY.CART_ITEMS)
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
        /**
         * @description refetching 'cartItems'
         */
        queryClient.invalidateQueries(QUERY_KEY.CART_ITEMS)
      },
    }
  )
  const loading = updateLoading || createNewLoading || deleteLoading

  /**
   * @description add product to cart
   * @param {number} productId product ID
   * @param {number} quantity quantity ( optional, defaults to 1 )
   * @returns {Promise<undefined>} void promise, makes api call
   */
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

  /**
   * @description removes product from cart
   * @param {number} productId product ID
   * @param {number} quantity quantity ( optional, defaults to 1 )
   * @returns {Promise<undefined>} void promise, makes api call
   */
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

  /**
   *  @description updates product's quantity inside the cart item
   * @param {number} cartItemId cart item's ID
   * @param {number} productId product's ID
   * @param {number} newQuantity new quantity
   * @returns {Promise<undefined>} void promise, makes api call
   */
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
