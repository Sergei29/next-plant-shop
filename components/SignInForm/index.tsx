import React, { useState } from "react"
import Input from "../Input"
import Field from "../Field"
import Button from "../Button"

type Props = {
  onSubmit: (...args: any[]) => void
}

const SignInForm = ({ onSubmit }: Props): JSX.Element => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleReset = () => {
    setEmail("")
    setPassword("")
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit({ email, password })
    handleReset()
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
      <Button type="submit" className="my-2">
        Sign In
      </Button>
    </form>
  )
}

export default SignInForm
