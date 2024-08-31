"use client";

import Link from "next/link";
import React from "react";
import FormWrapper from "./FormWrapper";
import FormInput from "./elements/FormInput";
import FormSubmitButton from "./elements/FormSubmitButton";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <FormWrapper formLabel="Login">
      <form onClick={handleSubmit}>
        <FormInput
          id={"email"}
          name={"email"}
          type="email"
          label="Email address"
        />

        <FormInput
          id={"password"}
          name={"password"}
          type="text"
          label="Passord"
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
          {"Password forgotten ?"}{" "}
          <Link href={"/reset-password"}>reset it</Link>
        </label>
      </div>
    </FormWrapper>
  );
};

export default LoginForm;
