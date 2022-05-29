export const REVALIDATE_PRODUCTS = process.env.REVALIDATE_SECONDS
  ? parseInt(process.env.REVALIDATE_SECONDS, 10)
  : 24 * 60 * 60
export const CMS_API = process.env.CMS_API || ""
