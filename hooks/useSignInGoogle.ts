import { useMutation, useQueryClient } from "react-query"
import { UserShort } from "../types"
import { fetchData, getErrorMessage } from "../lib"
import { QUERY_KEY } from "../constants"

/**
 * @description user sign-in with Google custom hook
 * @param {Function|undefined} onSuccess callback on success ( optional )
 * @returns {Object} sign-in handler and sign-in api call status properties
 */
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

  /**
   * @description google sign-in calllback
   * @param {string} accessToken access token returned by CMS service in login success
   * @returns {Promise<boolean>} promise , resolving to boolean(success or not)
   */
  const googleSignIn = async (accessToken: string) => {
    try {
      const user = await mutateAsync(accessToken)
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
    googleSignIn,
    gSignInLoading: isLoading,
    gSignInError: isError ? getErrorMessage(error) : null,
    gSignInStatus: status,
  }
}
