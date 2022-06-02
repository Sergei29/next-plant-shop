import type { NextPage } from "next"
import Head from "next/head"
import PageContainer from "../components/PageContainer"
import SignInForm from "../components/SignInForm"
import AuthButton from "../components/AuthButton"

const SignInPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next Shop | Sign in</title>
        <meta name="description" content="Next shop, sign in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <PageContainer.Title className="flex gap-4 items-baseline">
          <span className="min-w-[103px]">Sign In</span>
          <AuthButton href="/register">
            Don&rsquo;t have an account? Register
          </AuthButton>
        </PageContainer.Title>

        <SignInForm />
      </PageContainer>
    </>
  )
}

export default SignInPage
