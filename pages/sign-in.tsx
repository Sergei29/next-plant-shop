import type { NextPage } from "next"
import Head from "next/head"
import PageContainer from "../components/PageContainer"
import SignInForm from "../components/SignInForm"
import { SignInCredentials, SignInResponse } from "../types"
import { NEXT_PUBLIC_CMS_API } from "../constants"
import { fetchData } from "../lib"

type PageProps = {}

const SignInPage: NextPage<PageProps> = ({}) => {
  const signInStart = async (credentials: SignInCredentials) => {
    try {
      const response = await fetchData<SignInResponse>(
        `${NEXT_PUBLIC_CMS_API}/auth/local`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: credentials,
        }
      )
      console.log({ response })
    } catch (error) {
      console.warn({ error })
    }
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
