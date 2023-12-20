import React from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../../hooks/useCart";

const Payment = () => {
  const [card] = useCart();
  const total = card.reduce((sum, item) => sum + item.price, 0);
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
  return (
    <div>
      <SectionTitle
        heading={"Payment"}
        subHeading={"please provide"}
      ></SectionTitle>
      <h3 className="text-3xl"></h3>
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={card} price={total}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
