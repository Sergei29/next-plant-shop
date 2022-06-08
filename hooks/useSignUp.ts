import { useMutation, useQueryClient } from "react-query"
import { SignUpCredentials, UserShort } from "../types"
import { fetchData, getErrorMessage } from "../lib"
import { QUERY_KEY } from "../constants"

/**
 * @description new user register custom hook
 * @param {Function|undefined} onSuccess callback on success ( optional )
 * @returns {Object} register handler and register api call status properties
 */
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

  /**
   * @description sign-up handler
   * @param {string} username username
   * @param {string} email user email
   * @param {string} password user password
   * @returns {Promise<boolean>} promise , resolving to boolean(success or not)
   */
  const signUp = async ({ username, email, password }: SignUpCredentials) => {
    try {
      const user = await mutateAsync({ username, email, password })
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
    signUp,
    signUpLoading: isLoading,
    signUpError: isError ? getErrorMessage(error) : null,
    signUpStatus: status,
  }
}
