import { useEffect } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import PageContainer from "../components/PageContainer"

type PageProps = {}

const ResultPage: NextPage<PageProps> = ({}) => {
  const router = useRouter()
  const sessionId = (router.query.session_id || null) as string | null

  useEffect(() => {
    if (sessionId) {
      console.log({ sessionId })
    }
    // make api call, see https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe

    // codebase example: https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/pages/result.tsx
  }, [sessionId])

  return (
    <>
      <Head>
        <title>Payment Completed</title>
        <meta name="description" content="Next page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <PageContainer.Title>Result</PageContainer.Title>
        <div>
          {sessionId && <p>Successfull payment. Session ID: {sessionId}</p>}
        </div>
      </PageContainer>
    </>
  )
}

export default ResultPage
