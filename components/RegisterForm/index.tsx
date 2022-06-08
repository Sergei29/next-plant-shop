import React, { useState } from "react"
import { useRouter } from "next/router"
import Input from "../Input"
import Field from "../Field"
import Button from "../Button"
import SuccessMessage from "../SuccessMessage"
import { useSignUp } from "../../hooks"

/**
 * @description new user register form
 * @param {Object} props component props
 * @returns {JSX.Element} markup for register form
 */
const RegisterForm = (): JSX.Element => {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signUp, signUpLoading, signUpError, signUpStatus } = useSignUp()

  /**
   * @description form submit handler
   * @param {Object} event form event object
   * @returns {Promise<undefined>} promise, signing up then redirect to home page
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const isSignedUp = await signUp({ username, email, password })
    if (isSignedUp) router.push("/")
  }

  if (signUpStatus === "success") return <SuccessMessage />

  return (
    <form className="inline-flex flex-col gap-4" onSubmit={handleSubmit}>
      <Field label="User Name">
        <Input
          name="username"
          type="text"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Field>
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
      {signUpError && <p className="text-red-700 h-7">{signUpError}</p>}
      {signUpLoading ? (
        <p>loading...</p>
      ) : (
        <Button type="submit">Sign Up</Button>
      )}
    </form>
  )
}

export default RegisterForm
