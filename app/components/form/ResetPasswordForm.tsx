"use client";

import Link from "next/link";
import React from "react";
import FormWrapper from "./FormWrapper";
import FormInput from "./elements/FormInput";
import FormSubmitButton from "./elements/FormSubmitButton";
import { useRouter } from "next/navigation";
import FooterElement from "./elements/FooterElement";
import Footer from "./elements/Footer";

const ResetPasswordForm = () => {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push("/confirm-reset-password");
  };
  return (
    <FormWrapper formLabel="Reset password" handleSubmit={handleSubmit}>
      <FormInput
        id={"email"}
        name={"email"}
        type="email"
        label="Email address"
      />

      <FormSubmitButton label="Submit" />

      <Footer>
        <FooterElement
          firstText="Don't have an account"
          secondText="signup"
          isborderTop={true}
          link="/signup"
        />
        <FooterElement
          firstText="Password remembered "
          secondText="login"
          link="/login"
        />
      </Footer>
    </FormWrapper>
  );
};

export default ResetPasswordForm;
