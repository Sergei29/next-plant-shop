import { DeliveryAddressType } from "../../../types"

export const handleValidateForm = (adderss: DeliveryAddressType): boolean => {
  const allFieldsPresent = Object.entries(adderss).reduce(
    (isValid, [fieldName, fieldValue]) => {
      if (fieldName === "city") return isValid
      return isValid && fieldValue.length > 0
    },
    true
  )

  return allFieldsPresent
}
