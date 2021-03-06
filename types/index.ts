export * from "./stripe"

export type Entity<D> = {
  id: number
  attributes: D
}

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

export type ListMetaData = {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
} & Record<string, any>

export type ProductRaw = {
  title: string
  description: string
  price: number
  picture: {
    data: Entity<Omit<ImageData, "id">>
  }
  createdAt: string
  updatedAt: string
}

export type ApiRawProduct = Entity<ProductRaw>

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

export type LoginCredentials = { email: string; password: string }
export type SignUpCredentials = {
  username: string
  email: string
  password: string
}

export type CartUser = Entity<Omit<UserRaw, "id">>

export type CartProduct = {
  id: number
  attributes: Omit<Product, "id" | "picture">
}

export type CartItemRaw = Entity<{
  quantity: number
  createdAt: string
  updatedAt: string
  user: {
    data: CartUser
  }
  product: {
    data: CartProduct
  }
}>

export type CartItemFormatted = {
  id: number
  quantity: number
  productId: number
  productTitle: string
  productPrice: number
  total: number
}

export type ApiCartPayloadType = {
  data: CartItemRaw[]
  meta: ListMetaData
}

export type ApiPostCartPayloadType = {
  data: CartItemRaw
  meta: Record<string, any>
}

export type Cart = {
  items: CartItemFormatted[]
  total: number
}

export type CartItemRequestPayload = {
  productId: number
  userId: number
  quantity: number
}

export type CartItemUpdatePayload = {
  productId: number
  userId: number
  quantity: number
  cartItemId: number
}

export type DeliveryAddressType = {
  name: string
  street: string
  postcode: string
  city: string
  email: string
}

export type CheckoutResult = "success" | "cancel"
