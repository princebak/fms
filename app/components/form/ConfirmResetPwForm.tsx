"use client";

import React, { useState } from "react";
import FormWrapper from "./FormWrapper";
import FormInput from "./elements/FormInput";
import FormSubmitButton from "./elements/FormSubmitButton";
import { useRouter, useSearchParams } from "next/navigation";
import FooterElement from "./elements/FooterElement";
import Footer from "./elements/Footer";
import AlertMessage from "../AlertMessage";
import { AlertMessageClass } from "@/classes";
import { changePassword } from "@/services/UserService";

const ConfimResetPwForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<AlertMessageClass | null>(null);
  const nsapi = useSearchParams().get("nsapi");

  // REGISTER FORM FIELDS INITIAL VALUES

  const initialValues = {
    code: nsapi,
    password: "",
    confirmPassword: "",
  };

  const [form, setForm] = useState(initialValues);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (form.code) {
      setIsLoading(true);
      const res = await changePassword({
        token: form.code,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });
      if (res.error) {
        setMessage({ content: res.error, color: "alert-danger" });
        setIsLoading(false);
      } else {
        setMessage({
          content: "Password changed with success !",
          color: "alert-success",
        });
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } else {
      setMessage({ content: "Bad request.", color: "alert-danger" });
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <FormWrapper formLabel="Confirm reset password" handleSubmit={handleSubmit}>
      {message && (
        <AlertMessage content={message.content} color={message?.color} />
      )}

      <FormInput
        label="Password"
        type="password"
        id="password"
        name="password"
        required
        value={form.password}
        handleChange={handleChange}
      />
      <FormInput
        label="Confirm password"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        required
        value={form.confirmPassword}
        handleChange={handleChange}
      />

      <FormSubmitButton label="Submit" isLoading={isLoading} />

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
