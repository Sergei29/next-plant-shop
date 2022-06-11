import type { NextPage } from "next"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import "../styles/globals.css"

const queryClient = new QueryClient()

/**
 * @description next page component
 * @param {object} props page props
 * @returns {JSX.Element} top level application page, rendered before any current page, wrap them w providers
 */
const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App
