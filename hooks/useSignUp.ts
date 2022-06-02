import { useMutation, useQueryClient } from "react-query"
import { SignUpCredentials, UserShort } from "../types"
import { fetchData, getErrorMessage } from "../lib"
import { QUERY_KEY } from "../constants"

export const useSignUp = (onSuccess?: (...args: any[]) => void) => {
  const queryClient = useQueryClient()

  const { mutateAsync, error, isLoading, isError, status } = useMutation(
    ({ username, email, password }: SignUpCredentials) =>
      fetchData<UserShort>(`/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { username, email, password },
      })
  )

  const signUp = async ({ username, email, password }: SignUpCredentials) => {
    try {
      const user = await mutateAsync({ username, email, password })
      queryClient.setQueryData(QUERY_KEY.USER, user)
      onSuccess && onSuccess()
      return true
    } catch (error) {
      // mutation.isError will be true
      return false
    }
  }

  return {
    signUp,
    signUpLoading: isLoading,
    signUpError: isError ? getErrorMessage(error) : null,
    signUpStatus: status,
  }
}
