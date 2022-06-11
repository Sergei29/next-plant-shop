import { useMutation, useQueryClient } from "react-query"
import { fetchData } from "../lib"
import { QUERY_KEY } from "../constants"

/**
 * @description user sign-out custom hook
 * @param {Function|undefined} onSuccess callback on success ( optional )
 * @returns {Object} sign-out handler and sign-out api call status properties
 */
export const useSignOut = (onSuccess?: (...args: any[]) => void) => {
  const queryCLient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(() => fetchData(`/api/logout`))

  /**
   * @description sign out handler
   * @returns {Promise<boolean>} promise , resolving to boolean(success or not)
   */
  const signOut = async () => {
    try {
      await mutateAsync()
      queryCLient.setQueryData(QUERY_KEY.USER, undefined)
      onSuccess && onSuccess()
      return true
    } catch (error) {
      /**
       * @description mutation.isError will be true
       */
      return false
    }
  }
  return { signOut, signOutLoading: isLoading }
}
