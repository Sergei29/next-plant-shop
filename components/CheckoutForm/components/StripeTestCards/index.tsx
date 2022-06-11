import React from "react"

const StripeTestCards = (): JSX.Element => (
  <div
    style={{
      display: "block",
      marginBlockStart: "1em",
      marginBlockEnd: "1em",
      marginInlineStart: 0,
      marginInlineEnd: 0,
    }}
  >
    Use any of the{" "}
    <a
      href="https://stripe.com/docs/testing#cards"
      target="_blank"
      rel="noopener noreferrer"
    >
      Stripe test cards
    </a>{" "}
    for this demo, e.g.{" "}
    <div className="card-number inline whitespace-nowrap font-mono text-blue-600 font-bold">
      4242
      <span className="inline-block w-1" />
      4242
      <span className="inline-block w-1" />
      4242
      <span className="inline-block w-1" />
      4242
    </div>
    .
  </div>
)

export default StripeTestCards
