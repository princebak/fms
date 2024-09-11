"use client";

// STRIPE
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  localLink,
  paymentMethod,
  SUBSCRIPTION_DAYS,
  subscriptionStatus,
} from "@/utils/constants";
import Loader from "../Loader";
import AlertMessage from "../AlertMessage";

import { updateSubscription } from "@/redux/slices/subscriptionSlice";

export default function CreditCardForm({
  amount,
  createSubscription,
  getUserLastActiveSubscription,
  renewSubscription,
}: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const { currentUser } = useSelector((state: any) => state.user);

  const dispatch = useDispatch();

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }
    const { error: submitError }: any = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
    const { error }: any = stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${localLink.APP_BASE_PATH}/payment-success`,
      },
    });
    if (error) {
      console.log("Payment error >> ", error);
      setErrorMessage(error.message);
    } else {
      // When the payment is done, the Subscription can be created
      const millisecondsToAdd = SUBSCRIPTION_DAYS * 24 * 60 * 60 * 1000;

      const lastActiveSubscription = await getUserLastActiveSubscription(
        currentUser._id
      );

      if (
        lastActiveSubscription &&
        lastActiveSubscription.status === subscriptionStatus.ACTIVE
      ) {
        // if there is an active subsciption, extends its expired date only

        const renewedSubscription = await renewSubscription(
          lastActiveSubscription._id,
          SUBSCRIPTION_DAYS
        );
        setSubscription(renewedSubscription);
      } else {
        const currentDate = new Date();
        currentDate.setTime(currentDate.getTime() + millisecondsToAdd);

        const newSubcription: ISubscription = {
          owner: currentUser?._id,
          expireAt: currentDate,
          status: subscriptionStatus.PAID,
          paymentMethod: paymentMethod.CREDIT_CARD,
        };
        const savedSubscription = await createSubscription(newSubcription);
        setSubscription(savedSubscription);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [amount]);

  useEffect(() => {
    if (subscription) {
      dispatch(updateSubscription(subscription));
    }
  }, [subscription]);

  if (!stripe || !clientSecret || !elements) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleFormSubmit} style={{ marginTop: "10px" }}>
      {errorMessage && (
        <AlertMessage content={errorMessage} color={"alert-danger"} />
      )}
      {clientSecret && <PaymentElement />}

      <div className="d-flex mt-3">
        <button
          disabled={!stripe || loading}
          className="btn btn-primary w-full"
          type="submit"
        >
          {!loading
            ? `Pay $${amount / 100} for ${SUBSCRIPTION_DAYS} days`
            : "Processing..."}
        </button>
      </div>
    </form>
  );
}
