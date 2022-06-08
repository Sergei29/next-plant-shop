import { useMutation, useQueryClient } from "react-query"
import { LoginCredentials, UserShort } from "../types"
import { fetchData, getErrorMessage } from "../lib"
import { QUERY_KEY } from "../constants"

/**
 * @description user sign-in custom hook
 * @param {Function|undefined} onSuccess callback on success ( optional )
 * @returns {Object} sign-in handler and sign-in api call status properties
 */
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

  /**
   * @description user login function
   * @param {string} email user email
   * @param {string} password user password
   * @returns {Promise<boolean>} promise , resolving to boolean(success or not)
   */
  const signIn = async ({ email, password }: LoginCredentials) => {
    try {
      const user = await mutateAsync({ email, password })
      queryClient.setQueryData(QUERY_KEY.USER, user)
      onSuccess && onSuccess()
      return true
    } catch (error) {
      /**
       * @description mutation.isError will be true
       */
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
