"use client";

import React, { useState } from "react";
import FormWrapper from "./FormWrapper";
import FormInput from "./elements/FormInput";
import FormSubmitButton from "./elements/FormSubmitButton";
import { useRouter } from "next/navigation";
import FooterElement from "./elements/FooterElement";
import Footer from "./elements/Footer";
import { AlertMessageClass } from "@/classes";
import AlertMessage from "../AlertMessage";

const ResetPasswordForm = ({ sendResetPwLink }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<AlertMessageClass | null>(null);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await sendResetPwLink(email);

    if (res.error) {
      setMessage({ content: res.error, color: "alert-danger" });
      setIsLoading(false);
    } else {
      router.push("/validate-reset-pw");
    }
  };
  return (
    <FormWrapper formLabel="Reset password" handleSubmit={handleSubmit}>
      {message && (
        <AlertMessage content={message.content} color={message?.color} />
      )}
      <FormInput
        id={"email"}
        name={"email"}
        type="email"
        label="Email address"
        required
        value={email}
        handleChange={(e) => setEmail(e.target.value)}
      />

      <FormSubmitButton label="Submit" isLoading={isLoading} />

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
