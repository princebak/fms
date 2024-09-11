import React from "react";
import LoginForm from "../../../components/form/LoginForm";
import { getUserLastActiveSubscription } from "@/services/SubscriptionService";

export const metadata = {
  title: "FMS | Login",
};

const page = () => {
  return (
    <LoginForm getUserLastActiveSubscription={getUserLastActiveSubscription} />
  );
};

export default page;
