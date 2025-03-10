import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement
} from "@stripe/react-stripe-js";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import StripeProvider from "../components/StripeProvider";
import { useUser } from "@clerk/clerk-react";
import { useCreatePaymentRecordMutation } from "../state/api";

const PaymentForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get("bookid");
  const { user } = useUser();
  const [createPaymentRecord] = useCreatePaymentRecordMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }
    if (!user?.id) {
      console.error("Please authenticated");
      return;
    }
    setLoading(true);
    try {
      const confirmPayment = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required"
      });

      if (confirmPayment.paymentIntent.status == "succeeded") {
        const transactionRecord = {
          price: confirmPayment.paymentIntent.amount,
          status: confirmPayment.paymentIntent.status,
          bookId: bookId,
          userId: user?.id
        };

        const { data, error } = await createPaymentRecord(transactionRecord);
        console.log({ data, error });
        navigate("/purchases");
      }
    } catch (error) {
      setErrorMessage("Payment failed. Please try again.");
      console.error("Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Complete Your Payment
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          Secure your purchase with Stripe
        </p>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-4">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <PaymentElement className="text-black" />

          <button
            type="submit"
            disabled={!stripe || !elements}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 transition-all duration-200"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

const Payment = () => {
  return (
    <StripeProvider>
      <PaymentForm />
    </StripeProvider>
  );
};

export default Payment;
