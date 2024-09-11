import PaymentSuccessForm from "@/app/components/form/PaymentSuccessForm";
import React from "react";
import { activeSubscription } from "@/services/SubscriptionService";
import AuthLayout from "../(auth)/layout";

const page = () => {
  return (
    <AuthLayout>
      {" "}
      <PaymentSuccessForm activeSubscription={activeSubscription} />
    </AuthLayout>
  );
};

export default page;
