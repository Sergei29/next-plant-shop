import axios, { AxiosError, AxiosResponse } from "axios"

export const generateServerError = () => {
  const res: AxiosResponse = {
    status: 501,
    data: { message: "Server error" },
    statusText: "Server error 501",
    headers: {},
    config: {},
  }
  return new AxiosError("Server error", "501", undefined, undefined, res)
}

export const generateWrongRequestError = () => {
  const res: AxiosResponse = {
    status: 404,
    data: { message: "Not Found" },
    statusText: "Not Found 404",
    headers: {},
    config: {},
  }
  return new AxiosError("Not Found", "404", undefined, undefined, res)
}

/**
 * @description (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
 */
export class ApiError extends Error {
  status: number
  constructor(url: string, status: number) {
    super(`'${url}' returned ${status}`)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }

    this.status = status
    this.name = "ApiError"
  }
}

export const fetchData = async <T>(url: string): Promise<T> => {
  try {
    const { data } = await axios.get<T>(url)
    return data
  } catch (error) {
    let statusCode = (error as AxiosError).response?.status || 400
    if (
      !(error as AxiosError).response ||
      (error as AxiosError).code === "ECONNREFUSED"
    ) {
      statusCode = 503
    }
    throw new ApiError(url, statusCode)
  }
}
