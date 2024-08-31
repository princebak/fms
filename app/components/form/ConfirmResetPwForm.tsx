"use client";

import Link from "next/link";
import React from "react";
import FormWrapper from "./FormWrapper";
import FormInput from "./elements/FormInput";
import FormSubmitButton from "./elements/FormSubmitButton";
import { useRouter } from "next/navigation";

const ConfimResetPwForm = () => {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <FormWrapper formLabel="Confirm reset password">
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email address"
          type="email"
          id="email"
          name="name"
          placeHolder="Enter email address"
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
      </form>

      <div
        className="d-flex flex-column mt-3"
        style={{ borderTop: "solid 1px #ddd" }}
      >
        <label className="form-text">
          {"Password remembered ?"} <Link href={"/login"}>login</Link>
        </label>
      </div>
    </FormWrapper>
  );
};

export default ConfimResetPwForm;
