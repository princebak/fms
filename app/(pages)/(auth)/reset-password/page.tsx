import ResetPasswordForm from "@/app/components/form/ResetPasswordForm";
import { sendResetPwLink } from "@/services/UserService";
import React from "react";

export const metadata = {
  title: "FMS | Reset password",
};

const page = () => {
  return <ResetPasswordForm sendResetPwLink={sendResetPwLink}/>;
};

export default page;
