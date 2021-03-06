import { useQuery } from "react-query"
import { fetchData } from "../lib"
import { UserShort } from "../types"
import { QUERY_KEY } from "../constants"

/**
 * @description fetch logged-in user data custom hook
 * @returns {Object|undefined} authenticated user data if logged in
 */
export const useUser = () => {
  const { data } = useQuery(
    QUERY_KEY.USER,
    async () => {
      try {
        return await fetchData<UserShort>(`/api/user`)
      } catch (error) {
        return
      }
    },
    {
      staleTime: 30_000, //ms
      cacheTime: Infinity,
    }
  )
  return data
}
