import type { NextPage } from "next"
import Head from "next/head"
import PageContainer from "../components/PageContainer"
import RegisterForm from "../components/RegisterForm"
import AuthButton from "../components/AuthButton"

const RegisterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next Shop | Sign Up</title>
        <meta name="description" content="Next shop, register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <PageContainer.Title className="flex gap-4 items-baseline">
          <span className="min-w-[103px]">Sign Up</span>
          <AuthButton href="/sign-in">
            Already have an account? Sign in
          </AuthButton>
        </PageContainer.Title>
        <RegisterForm />
      </PageContainer>
    </>
  )
}

export default RegisterPage
