import ValidateEmailForm from "@/app/components/form/ValidateEmailForm";
import { sendEmailWithEmailJs } from "@/services/NotificationService";
import React from "react";

export const metadata = {
  title: "FMS | Validate email",
};

const page = () => {
  return <ValidateEmailForm sendEmailWithEmailJs={sendEmailWithEmailJs}/>;
};

export default page;
