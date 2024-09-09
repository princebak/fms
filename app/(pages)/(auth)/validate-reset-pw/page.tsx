import ValidateResetPwForm from "@/app/components/form/ValidateResetPwForm";
import { sendEmailWithEmailJs } from "@/services/NotificationService";
import React from "react";

export const metadata = {
  title: "FMS | Validate reset password",
};

const page = () => {
  return <ValidateResetPwForm sendEmailWithEmailJs={sendEmailWithEmailJs} />;
};

export default page;
