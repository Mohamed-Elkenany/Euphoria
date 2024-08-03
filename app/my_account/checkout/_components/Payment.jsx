import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHER_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

function Payment({ amount }) {
  return (
    <div>
      <div className="my-6">
        <h1 className="font-bold text-xl text-colorGrayOne tracking-wide">
          Payment Method
        </h1>
        <p className="text-sm text-colorGrayThree tracking-wide mt-1">
          All transactions are secure and encrypted.
        </p>
      </div>
      <div className="p-4 bg-colorGrayFour rounded-md">
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: +amount * 1000,
            currency: "egp",
            automatic_payment_methods: { enabled: true },
          }}
        >
          <CheckoutForm amount={amount} />
        </Elements>
      </div>
    </div>
  );
}

export default Payment;
