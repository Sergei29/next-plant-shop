export type ImgFormat = {
  name: string
  hash: string
  ext: string
  mime: string
  path: null | string
  width: number
  height: number
  size: number
  url: string
}

export type ImageData = {
  id: number
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: {
    thumbnail: ImgFormat
    medium: ImgFormat
    small: ImgFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: null | string
  provider: string
  provider_metadata: null | Record<string, any>
  createdAt: string
  updatedAt: string
}

export type ImageDataShort = Pick<ImageData, "url" | "id">

export type Product = {
  id: number
  title: string
  description: string
  price: number
  picture: ImageData
  createdAt: string
  updatedAt: string
}

export type ProductShort = {
  id: number
  title: string
  price: number
  picture: ImageDataShort
}

export type ApiRawProduct = {
  id: number
  attributes: {
    title: string
    description: string
    price: number
    picture: {
      data: {
        id: number
        attributes: Omit<ImageData, "id">
      }
    }
    createdAt: string
    updatedAt: string
  }
}
export type ApiPayloadProductsList = {
  data: ApiRawProduct[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  } & Record<string, any>
}

export type ApiPayloadProductDetails = {
  data: ApiRawProduct
  meta: Record<string, any>
}

export type SignInCredentials = {
  identifier: string
  password: string
}

export type UserRaw = {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
}

export type UserShort = {
  id: number
  name: string
}

export type SignInResponse = {
  jwt: string
  user: UserRaw
}

export type ErrorResponse = { error: { message: string } }
