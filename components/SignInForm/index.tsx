import React, { useState } from "react"
import { useRouter } from "next/router"
import Input from "../Input"
import Field from "../Field"
import Button from "../Button"
import { SignInResponse } from "../../types"
import { fetchData, getErrorMessage } from "../../lib"

type Status = {
  loading: boolean
  error: null | string
}

const SignInForm = (): JSX.Element => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<Status>({ loading: false, error: null })

  const handleReset = () => {
    setEmail("")
    setPassword("")
    setStatus({ loading: false, error: null })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus({ loading: true, error: null })
    try {
      const response = await fetchData<SignInResponse>(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { email, password },
      })
      router.push("/")
      handleReset()
    } catch (error) {
      const message = getErrorMessage(error)
      setStatus({ loading: false, error: message })
    }
  }

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
      {status.error && <p className="text-red-700 h-7">{status.error}</p>}
      {status.loading ? (
        <p>loading...</p>
      ) : (
        <Button type="submit">Sign In</Button>
      )}
    </form>
  )
}

export default SignInForm
