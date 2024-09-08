"use client";

import Link from "next/link";
import React from "react";
import FormWrapper from "./FormWrapper";
import FormInput from "./elements/FormInput";
import FormSubmitButton from "./elements/FormSubmitButton";
import { useRouter } from "next/navigation";
import FooterElement from "./elements/FooterElement";
import Footer from "./elements/Footer";

const ConfimResetPwForm = () => {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <FormWrapper formLabel="Confirm reset password" onSubmit={handleSubmit}>
      <FormInput
        label="Email address"
        type="email"
        id="email"
        name="name"
        title="Enter email address"
      />
      <FormInput
        label="Password"
        type="password"
        id="password"
        name="password"
      />
      <FormInput
        label="Confirm password"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
      />

      <FormSubmitButton label="Submit" />

      <Footer>
        <FooterElement
          firstText="Password remembered"
          secondText="login"
          isborderTop={true}
          link="/login"
        />
      </Footer>
    </FormWrapper>
  );
};

export default ConfimResetPwForm;
