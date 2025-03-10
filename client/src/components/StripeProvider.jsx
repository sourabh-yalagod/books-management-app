import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useCreatePaymentIntentMutation } from "../state/api";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSkeleton from "./skeleton/PaymentSkeleton";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#0570de",
    colorBackground: "#18181b",
    colorText: "#d2d2d2",
    colorDanger: "#df1b41",
    colorTextPlaceholder: "#6e6e6e",
    fontFamily: "Inter, system-ui, sans-serif",
    spacingUnit: "3px",
    borderRadius: "10px",
    fontSizeBase: "14px"
  }
};

const StripeProvider = ({ children }) => {
  const { amount = 10 } = useParams();
  const [clientSecret, setClientSecret] = useState(null);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await createPaymentIntent(amount).unwrap();
        console.log("response : ", response.data);

        if (response) {
          setClientSecret(response.data);
        } else {
          console.error("No clientSecret received from the API");
        }
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    fetchPaymentIntent();
  }, [amount]);

  if (!clientSecret) {
    return <PaymentSkeleton />;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
