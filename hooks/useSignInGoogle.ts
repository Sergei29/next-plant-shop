import { useMutation, useQueryClient } from "react-query"
import { UserShort } from "../types"
import { fetchData, getErrorMessage } from "../lib"
import { QUERY_KEY } from "../constants"

export const useSignInGoogle = (onSuccess?: (...args: any[]) => void) => {
  const queryClient = useQueryClient()

  const { mutateAsync, error, isLoading, isError, status } = useMutation(
    (access_token: string) =>
      fetchData<UserShort>(`/api/auth/google/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { access_token },
      })
  )

  const googleSignIn = async (access_token: any) => {
    try {
      const user = await mutateAsync(access_token)
      queryClient.setQueryData(QUERY_KEY.USER, user)
      onSuccess && onSuccess()
      return true
    } catch (error) {
      // mutation.isError will be true
      return false
    }
  }
  return {
    googleSignIn,
    gSignInLoading: isLoading,
    gSignInError: isError ? getErrorMessage(error) : null,
    gSignInStatus: status,
  }
}
