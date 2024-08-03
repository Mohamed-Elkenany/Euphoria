"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import {
  useCreateOrderMutation,
  useUpdateUserCartMutation,
} from "@/app/_utitly/RTKQAPI/appApi";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createOrderFun] = useCreateOrderMutation();
  const [updateCartFun] = useUpdateUserCartMutation();
  const orderDetails = useSelector((state) => state.rootReducer.orderSlice);
  const user = useSelector((state) => state.rootReducer.userSlice);
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((e) => console.log(e));
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderDetails.address) {
      return toast.warn("Your address is required", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
      });
    }
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
    const response = await createOrderFun({
      data: orderDetails,
      token: user.user.jwt,
    }).then((res) => res.data);
    if (!response) {
      return toast.warn("Somthing wrong try again", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
      });
    }
    const updateResponse = await updateCartFun({
      data: {
        users_permissions_user: user.user.user.id,
        productDetails: [],
      },
      id: user.cartId,
      token: user.user.jwt,
    }).then((res) => res.data);
    if (!updateResponse) {
      return toast.warn("Somthing wrong try again", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
      });
    }
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}`,
      },
    });
    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-2 rounded-md">
      {errorMessage && <div>{errorMessage}</div>}
      {clientSecret && <PaymentElement />}
      <button
        disabled={!stripe || loading }
        className="text-white w-full p-5 bg-colorPink mt-6 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay EGP ${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutForm;
