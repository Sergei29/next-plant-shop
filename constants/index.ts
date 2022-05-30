export const REVALIDATE_PRODUCTS = process.env.REVALIDATE_SECONDS
  ? parseInt(process.env.REVALIDATE_SECONDS, 10)
  : 24 * 60 * 60
export const CMS_API = process.env.CMS_API || ""
export const NEXT_PUBLIC_CMS_API = process.env.NEXT_PUBLIC_CMS_API || ""
