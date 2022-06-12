import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { useMutation } from "react-query"
import { CheckoutResult } from "../types"
import { fetchData, getErrorMessage } from "../lib"
import { useCartItems } from "../hooks"

type ApiDeleteCartResponse = {
  deletedItems: number[]
}

export const useCheckoutResult = () => {
  const {
    query: { status },
  } = useRouter()
  const { cart } = useCartItems()
  const {
    mutateAsync,
    data,
    isLoading: loading,
    error,
    status: deleteCartStatus,
  } = useMutation((ids: number[]) =>
    fetchData<ApiDeleteCartResponse>(`/api/cart/${ids.join("/")}`, {
      method: "DELETE",
    })
  )

  const checkoutResult = status as CheckoutResult | undefined
  const { items = [] } = cart || {}

  useEffect(() => {
    if (checkoutResult !== CheckoutResult.success || items.length === 0) {
      return
    }
    const ids = items.map((item) => item.id)
    mutateAsync(ids)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutResult, items])

  return {
    data,
    loading,
    error: getErrorMessage(error),
    status: deleteCartStatus,
  }
}
