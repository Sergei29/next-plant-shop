import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios"
import { ERROR_MSG } from "../constants"

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
  constructor(url: string, status: number, message?: string | null) {
    super(message || `'${url}' returned ${status}`)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }

    this.status = status
    this.name = "ApiError"
  }
}

export const fetchData = async <T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const { data } = await axios(url, {
      method: "GET",
      ...config,
    })
    return data as T
  } catch (error) {
    const errorMessage = getErrorMessageFromApi(error)
    let statusCode = (error as AxiosError).response?.status || 400
    if (
      !(error as AxiosError).response ||
      (error as AxiosError).code === "ECONNREFUSED"
    ) {
      statusCode = 503
    }
    throw new ApiError(url, statusCode, errorMessage)
  }
}

export const getErrorMessage = (error: ApiError | Error | any) => {
  let message = null

  if (error instanceof ApiError) {
    message = error.message || ERROR_MSG[`${error.status}`]
  } else if (error instanceof Error) {
    message = error.message || null
  }

  return message || ERROR_MSG.default
}

export function getErrorMessageFromApi(error: Error | AxiosError | any) {
  let errorMessage: string | null = null

  if (error instanceof AxiosError) {
    const { code = "default", message, request, response } = error
    if (!!response) {
      errorMessage =
        response.data?.error?.message || message || ERROR_MSG[code] || null
    } else if (!!request) {
      errorMessage = request.statusText || message || ERROR_MSG[code] || null
    } else if (error instanceof Error) {
      errorMessage = error.message || null
    }
  }

  return errorMessage
}
