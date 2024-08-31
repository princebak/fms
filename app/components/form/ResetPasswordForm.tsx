"use client";

import Link from "next/link";
import React from "react";
import FormWrapper from "./FormWrapper";
import FormInput from "./elements/FormInput";
import FormSubmitButton from "./elements/FormSubmitButton";
import { useRouter } from "next/navigation";

const ResetPasswordForm = () => {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push("/confirm-reset-password");
  };
  return (
    <FormWrapper formLabel="Reset password">
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormInput
          id={"email"}
          name={"email"}
          type="text"
          label="Email address"
        />

        <FormSubmitButton label="Submit" />
      </form>
      <div
        className="d-flex flex-column mt-3"
        style={{ borderTop: "solid 1px #ddd" }}
      >
        <label className="form-text">
          {"Don't have an account ?"} <Link href={"/signup"}>signup</Link>
        </label>
        <label className="form-text">
          {"Password remembered ?"} <Link href={"/login"}>login</Link>
        </label>
      </div>
    </FormWrapper>
  );
};

export default ResetPasswordForm;
