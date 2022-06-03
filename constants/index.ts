export const REVALIDATE_PRODUCTS = process.env.REVALIDATE_SECONDS
  ? parseInt(process.env.REVALIDATE_SECONDS, 10)
  : 24 * 60 * 60
export const CMS_API = process.env.CMS_API || ""
export const NEXT_PUBLIC_CMS_API = process.env.NEXT_PUBLIC_CMS_API || ""
export const NEXT_PUBLIC_CMS_API_DEV = process.env.NEXT_PUBLIC_CMS_API_DEV || ""
export const QUERY_KEY = {
  USER: "user",
}

export const ERROR_MSG: Record<string, string> = {
  default: "An error occurred",
  "400": "Bad Request",
  "401": "Unauthenticated. Please, login",
  "403":
    "Forbidden. You do not have access rights to the content. Ask your administrator",
  "404": "Not found",
  "407":
    "Proxy Authentication Required. Authentication is needed to be done by a proxy",
  "408": "Request timed out",
  "500": "Internal Server Error. Something went wrong our side.",
  "502":
    "Bad Gateway. Server got an invalid response while processing your request",
  "503": "Service unavailable. Connection refused by server",
  "504": "Gateway Timeout. The request taking too long",
  "511":
    "Network Authentication Required. Indicates that the client needs to authenticate to gain network access.",
}
