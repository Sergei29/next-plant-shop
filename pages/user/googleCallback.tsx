import React, { useEffect, useContext, useState } from "react"
import { useRouter } from "next/router"
import PageContainer from "../../components/PageContainer"
import { useSignIn, useUser } from "../../hooks"

type Props = {}

const GoogleCallback = ({}: Props): JSX.Element => {
  const [error, setError] = useState()
  const router = useRouter()
  const { handleGoogleCallback } = useSignIn()

  useEffect(() => {
    if (!router.query?.access_token) return
    const signIn = async () => {
      const [response, error] = await handleGoogleCallback<Record<string, any>>(
        router.query.access_token
      )
      console.log("[response, error]: ", [response, error])
    }
    signIn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  return (
    <PageContainer>
      <PageContainer.Title>Google sign in</PageContainer.Title>
    </PageContainer>
  )
}

export default GoogleCallback
