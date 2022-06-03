import { useMutation, useQueryClient } from "react-query"
import { fetchData } from "../lib"
import { QUERY_KEY } from "../constants"

export const useSignOut = (onSuccess?: (...args: any[]) => void) => {
  const queryCLient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(() => fetchData(`/api/logout`))

  const signOut = async () => {
    try {
      await mutateAsync()
      queryCLient.setQueryData(QUERY_KEY.USER, undefined)
      onSuccess && onSuccess()
      return true
    } catch (error) {
      return false
    }
  }
  return { signOut, signOutLoading: isLoading }
}
