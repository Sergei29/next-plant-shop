import type { NextPage } from "next"
import Head from "next/head"
import PageContainer from "../components/PageContainer"
import SignInForm from "../components/SignInForm"

type PageProps = {}

const SignInPage: NextPage<PageProps> = ({}) => {
  const signInStart = (formState: Record<string, any>) => {
    console.log("Submit: ", formState)
  }
  return (
    <>
      <Head>
        <title>Next Shop | Sign in</title>
        <meta name="description" content="Next shop, sign in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <PageContainer.Title>Sign In</PageContainer.Title>
        <SignInForm onSubmit={signInStart} />
      </PageContainer>
    </>
  )
}

export default SignInPage
