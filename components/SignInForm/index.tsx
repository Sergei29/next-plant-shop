import React, { useState } from "react"
import { useRouter } from "next/router"
import Input from "../Input"
import Field from "../Field"
import Button from "../Button"
import { useSignIn } from "../../hooks"

const SuccessMessage = () => (
  <div className="flex flex-col justify-center ml-4">
    <h2>Success</h2>
  </div>
)

const SignInForm = (): JSX.Element => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, signInLoading, signInError, signInStatus } = useSignIn()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const isSignedIn = await signIn({ email, password })
    if (isSignedIn) router.push("/")
  }

  if (signInStatus === "success") return <SuccessMessage />
  return (
    <form className="inline-flex flex-col gap-4" onSubmit={handleSubmit}>
      <Field label="Email">
        <Input
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Field>
      <Field label="Password">
        <Input
          name="password"
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Field>
      {signInError && <p className="text-red-700 h-7">{signInError}</p>}
      {signInLoading ? (
        <p>loading...</p>
      ) : (
        <Button type="submit">Sign In</Button>
      )}
    </form>
  )
}

export default SignInForm
