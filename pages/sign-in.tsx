import type { NextPage } from "next"
import Head from "next/head"
import PageContainer from "../components/PageContainer"
import SignInForm from "../components/SignInForm"
import AuthButton from "../components/AuthButton"
import GoogleLogin from "../components/GoogleLogin"

type PageProps = {}

/**
 * @description next page component
 * @param {object} props page props
 * @returns {JSX.Element} existing user login page
 */
const SignInPage: NextPage<PageProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Next Shop | Sign in</title>
        <meta name="description" content="Next shop, sign in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <PageContainer.Title className="flex gap-4 items-center">
          <span className="min-w-[103px]">Sign In</span>
          <AuthButton href="/register">
            Don&rsquo;t have an account? Register
          </AuthButton>
          <GoogleLogin />
        </PageContainer.Title>

        <SignInForm />
      </PageContainer>
    </>
  )
}

export default SignInPage
