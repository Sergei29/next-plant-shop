import type { NextPage } from "next"
import Head from "next/head"
import PageContainer from "../components/PageContainer"

type PageProps = {}

const SignInPage: NextPage<PageProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Next Shop | Sign in</title>
        <meta name="description" content="Next shop, sign in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <PageContainer.Title>Sign In</PageContainer.Title>
      </PageContainer>
    </>
  )
}

export default SignInPage
