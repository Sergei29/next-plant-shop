/**
 * @description util: formats number to price display currency format
 * @param {number} amount amount
 * @param {string} currency currency
 * @returns {string} stringified price with currrency
 */
export const formatAmountForDisplay = (
  amount: number,
  currency: string
): string => {
  const numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  })
  return numberFormat.format(amount)
}

/**
 * @description util: formats numberic value to numeric value accepted by stripe API
 * @param {number} amount price
 * @param {string} currency currency
 * @returns {number} formatted price number accepted by stripe
 */
export const formatAmountForStripe = (
  amount: number,
  currency: string
): number => {
  let isZeroDecimalCurrency: boolean = true
  const numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  })
  const parts = numberFormat.formatToParts(amount)

  for (let part of parts) {
    if (part.type === "decimal") {
      isZeroDecimalCurrency = false
    }
  }

  return isZeroDecimalCurrency ? amount : Math.round(amount * 100)
}

/**
 * @description util: formats numberic value to numeric value received from stripe API
 * @param {number} amount price
 * @param {string} currency currency
 * @returns {number} formatted price number application friendly
 */
export const formatAmountFromStripe = (
  amount: number,
  currency: string
): number => {
  let isZeroDecimalCurrency: boolean = true
  const numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  })
  const parts = numberFormat.formatToParts(amount)

  for (let part of parts) {
    if (part.type === "decimal") {
      isZeroDecimalCurrency = false
    }
  }

  return isZeroDecimalCurrency ? amount : Math.round(amount / 100)
}
