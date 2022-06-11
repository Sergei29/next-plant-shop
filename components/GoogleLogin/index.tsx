import React from "react"
import { NEXT_PUBLIC_CMS_API } from "../../constants"
import GoogleIcon from "./components/GoogleIcon"

/**
 * @description login with Google button via the CMS service URL
 * @param {Object} props component props
 * @returns {JSX.Element} markup for Google login button
 */
const GoogleLogin = (): JSX.Element => (
  <button
    className="flex items-center px-2 text-lg bg-white border-2 border-gray-500 rounded-md shadow outline-none hover:bg-slate-50 hover:border-slate-400 focus:outline-none"
    onClick={() =>
      (window.location = `${NEXT_PUBLIC_CMS_API}/connect/google` as any)
    }
  >
    <GoogleIcon className="w-6 h-6 mr-3 text-gray-900 fill-current" />
    Google login
  </button>
)

export default GoogleLogin
