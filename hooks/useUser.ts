import { useQuery } from "react-query"
import { fetchData } from "../lib"
import { UserShort } from "../types"

export const useUser = () => {
  const { data } = useQuery(
    "user",
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
