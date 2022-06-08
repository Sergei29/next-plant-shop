import React, { useEffect } from "react"
import { useRouter } from "next/router"
import PageContainer from "../../components/PageContainer"
import { useSignInGoogle } from "../../hooks"

const GoogleCallback = (): JSX.Element => {
  const router = useRouter()
  const { googleSignIn, gSignInError, gSignInLoading, gSignInStatus } =
    useSignInGoogle()

  useEffect(() => {
    if (!router.query?.access_token) return
    const signIn = async () => {
      const isSignedIn = await googleSignIn(router.query.access_token as string)
      if (isSignedIn) router.push("/")
    }
    signIn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  return (
    <PageContainer>
      <PageContainer.Title>Google</PageContainer.Title>
      {gSignInLoading && <p>Signing in...</p>}
      {gSignInStatus === "success" && <p>Success</p>}
      {gSignInError && <p>{gSignInError}</p>}
    </PageContainer>
  )
}

export default GoogleCallback
