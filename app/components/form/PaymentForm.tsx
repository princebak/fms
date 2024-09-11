"use client";

import React from "react";
import Footer from "./elements/Footer";
import FooterElement from "./elements/FooterElement";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CreditCardForm from "./CreateCardForm";
import { SUBSCRIPTION_AMOUNT } from "@/utils/constants";

const stripePromise = loadStripe(
  "pk_test_51IsqFIHteDFlXfC5jq5UwTbQDkHz5JUPkzJTwZwbVE63kzn2T65f3STLeHMQjRhD0MAycmzXU0r92lV9YZMwlOeT00RXQAUwrc"
);

const PaymentForm = ({
  createSubscription,
  getUserLastActiveSubscription,
  renewSubscription,
}: any) => {
  return (
    <div
      className="bd-example d-flex flex-column gap-2 mt-2"
      style={{
        border: "solid 1px #ddd",
        borderRadius: "5px",
        height: "fit-content",
      }}
      id="formWrapper"
    >
      <div
        className="d-flex justify-between flex-wrap p-2"
        style={{
          borderBottom: "solid 1px #ddd",
          backgroundColor: "rgb(245,245,245)",
        }}
      >
        <label style={{ color: "black" }}> {"Subscription Payment"}</label>
      </div>

      <div className="p-3">
        <div className="d-flex flex-column gap-3">
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: Math.round(SUBSCRIPTION_AMOUNT * 100),
              currency: "usd",
            }}
          >
            <CreditCardForm
              amount={Math.round(SUBSCRIPTION_AMOUNT * 100)}
              createSubscription={createSubscription}
              getUserLastActiveSubscription={getUserLastActiveSubscription}
              renewSubscription={renewSubscription}
            />
          </Elements>

          <Footer>
            <FooterElement
              firstText="Don't want to continue"
              secondText="dashboard"
              isborderTop={true}
              link="/dashboard"
            />
          </Footer>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
