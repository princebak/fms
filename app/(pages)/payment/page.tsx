import PaymentForm from "@/app/components/form/PaymentForm";
import React from "react";
import AuthLayout from "../(auth)/layout";
import {
  createSubscription,
  getUserLastActiveSubscription,
  renewSubscription,
} from "@/services/SubscriptionService";

const page = () => {
  return (
    <AuthLayout>
      <PaymentForm
        createSubscription={createSubscription}
        getUserLastActiveSubscription={getUserLastActiveSubscription}
        renewSubscription={renewSubscription}
      />
    </AuthLayout>
  );
};

export default page;
