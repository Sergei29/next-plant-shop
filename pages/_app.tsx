import type { NextPage } from "next"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import "../styles/globals.css"

const queryClient = new QueryClient()

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App
