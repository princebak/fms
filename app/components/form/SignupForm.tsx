"use client";

import Link from "next/link";
import React from "react";
import FormWrapper from "./FormWrapper";
import FormInput from "./elements/FormInput";
import FormSubmitButton from "./elements/FormSubmitButton";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <FormWrapper formLabel="Signup">
      <form onSubmit={handleSubmit}>
        <FormInput id={"name"} name={"name"} type="text" label="Full name" />
        <FormInput
          id={"email"}
          name={"email"}
          type="email"
          label="Email address"
        />

        <FormInput
          id={"phone"}
          name={"phone"}
          type="text"
          label="Phone number"
        />

        <FormInput
          id={"password"}
          name={"password"}
          type="text"
          label="Passord"
        />
        <FormInput
          id={"confirmPassword"}
          name={"confirmPassword"}
          type="text"
          label="Confirm password"
        />

        <FormSubmitButton label="Submit" />
      </form>

      <div
        className="d-flex flex-column mt-3"
        style={{ borderTop: "solid 1px #ddd" }}
      >
        <label className="form-text">
          {"Already have an account ?"} <Link href={"/login"}>login</Link>
        </label>
      </div>
    </FormWrapper>
  );
};

export default SignupForm;
