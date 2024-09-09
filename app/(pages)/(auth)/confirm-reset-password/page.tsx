import ConfimResetPwForm from "@/app/components/form/ConfirmResetPwForm";
import React from "react";
import { changePassword } from "@/services/UserService";

export const metadata = {
  title: "FMS | Confim reset password",
};

const page = () => {
  return <ConfimResetPwForm changePassword={changePassword} />;
};

export default page;
