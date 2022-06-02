import { useMutation, useQueryClient } from "react-query"
import { LoginCredentials, UserShort } from "../types"
import { fetchData, getErrorMessage } from "../lib"
import { QUERY_KEY } from "../constants"

export const useSignIn = (onSuccess?: (...args: any[]) => void) => {
  const queryClient = useQueryClient()

  const { mutateAsync, error, isLoading, isError, status } = useMutation(
    ({ email, password }: LoginCredentials) =>
      fetchData<UserShort>(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { email, password },
      })
  )

  const signIn = async ({ email, password }: LoginCredentials) => {
    try {
      const user = await mutateAsync({ email, password })
      queryClient.setQueryData(QUERY_KEY.USER, user)
      onSuccess && onSuccess()
      return true
    } catch (error) {
      // mutation.isError will be true
      return false
    }
  }

  return {
    signIn,
    signInLoading: isLoading,
    signInError: isError ? getErrorMessage(error) : null,
    signInStatus: status,
  }
}
