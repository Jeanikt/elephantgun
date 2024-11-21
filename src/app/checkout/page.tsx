"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/cart-context";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout() {
  const { cart } = useCart();
  const [clientSecret, setClientSecret] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-mono mb-8">Checkout</h1>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm amount={total} productName="Eco Bag" />
        </Elements>
      )}
    </div>
  );
}
