import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`${process.env.GATSBY_KEY_STRIPE}`)
  }
  return stripePromise
}

const Checkout = ({price, text, hoverText}) => {
  const [loading, setLoading] = useState(false)

  const redirectToCheckout = async event => {
    event.preventDefault()
    setLoading(true)
    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price, quantity: 1 }],
      successUrl: `${process.env.GATSBY_SUCCESS_URL_STRIPE}`,
      cancelUrl:`${process.env.GATSBY_CANCEL_URL_STRIPE}`,
    })
    if (error) {
      setLoading(false)
    }
  }
  return (
    <button
      id="checkout-cta"
      disabled={loading}
      onClick={redirectToCheckout}
      className="button button--animated"
    >
      <span className="display-text">{text}</span>
      <span className="hover-text">{hoverText}</span>
    </button>
  )
}
export default Checkout