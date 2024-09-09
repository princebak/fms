import SignupForm from "@/app/components/form/SignupForm";
import { register } from "@/services/UserService";
import React from "react";

export const metadata = {
  title: "FMS | Signup",
};

const page = () => {
  return <SignupForm register={register} />;
};

export default page;
