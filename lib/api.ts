import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios"
import { NextApiResponse } from "next"
import { ERROR_MSG } from "../constants"

/**
 * @description dev.util: generates server side error
 * @returns {AxiosError} instance of axios error
 */
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

/**
 * @description dev.util: generates wrong request error
 * @returns {AxiosError} instance of axios error
 */
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
 * @description custom error class (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
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

/**
 * @description util: fetching data function
 * @param {string} url resource URL
 * @param {Object} config api call configuration
 * @returns {Promise} promise, resolving to a generic type depending on use case
 */
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

/**
 * @description util: extracts error message from a possible error response
 * @param { ApiError|Error|null|any } error a possible error
 * @returns {string|null} error message, if any
 */
export const getErrorMessage = (
  error: ApiError | Error | null | any
): string | null => {
  if (error === null) return error
  let message = null

  if (error instanceof ApiError) {
    message = error.message || ERROR_MSG[`${error.status}`]
  } else if (error instanceof Error) {
    message = error.message || null
  }

  return message || ERROR_MSG.default
}

/**
 * @description util: extracts error message from a possible error response from API
 * @param { Error | AxiosError | any } error a possible error
 * @returns {string|null} error message, if any
 */
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

/**
 * @description util: reusable error handling in `catch(e){}` block for API route handler, to be used inside the catch block
 * @param {unknown} error error response
 * @param {NextApiResponse} res next API response object
 * @returns {undefined} creates API response in case of error occurence
 */
export const processServerError = (error: unknown, res: NextApiResponse) => {
  const message = getErrorMessage(error) as string
  const status = (error as ApiError).status || 401
  res.status(status).json({ error: { message } })
}
