"use client";

import React, { useState } from "react";
import FormWrapper from "./FormWrapper";
import FormInput from "./elements/FormInput";
import FormSubmitButton from "./elements/FormSubmitButton";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateJustRegisteredUser } from "@/redux/slices/userSlice";
import Footer from "./elements/Footer";
import FooterElement from "./elements/FooterElement";
import AlertMessage from "../AlertMessage";
import { AlertMessageClass } from "@/classes";

const SignupForm = ({ register }: any) => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const router = useRouter();

  const [message, setMessage] = useState<AlertMessageClass | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialValues);
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isLoading) {
      setIsLoading(true);

      const res: any = await register(form);

      if (res.error) {
        setMessage({ content: res.error, color: "alert-danger" });
      } else {
        setMessage({
          content:
            "Registered with success, please click on the confirmation link sent in your mail box !",
          color: "alert-success",
        });
        setForm(initialValues);
        /*We save the registered user in local storage
          to use it for the resend email request on the validate-email
        */
        dispatch(updateJustRegisteredUser(res)); // when success, the response is the registered user
        setInterval(() => {
          router.push("/validate-email");
        }, 3000);
      }
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <FormWrapper formLabel="Signup" handleSubmit={handleSubmit}>
      {message && (
        <AlertMessage content={message.content} color={message?.color} />
      )}
      <FormInput
        id={"name"}
        name={"name"}
        type="text"
        label="Full name"
        placeHolder="Prince Bakenga"
        title="Full name"
        value={form.name}
        handleChange={handleChange}
      />
      <FormInput
        id={"email"}
        name={"email"}
        type="email"
        label="Email address"
        title="Email address"
        value={form.email}
        handleChange={handleChange}
      />

      <FormInput
        id={"phone"}
        name={"phone"}
        type="tel"
        label="Phone number"
        title="Phone number"
        value={form.phone}
        handleChange={handleChange}
      />

      <FormInput
        id={"password"}
        name={"password"}
        type="password"
        label="Password"
        title="Password"
        value={form.password}
        handleChange={handleChange}
      />
      <FormInput
        id={"confirmPassword"}
        name={"confirmPassword"}
        type="password"
        label="Confirm password"
        title="Confirm password"
        value={form.confirmPassword}
        handleChange={handleChange}
      />

      <FormSubmitButton label="Submit" isLoading={isLoading} />

      <Footer>
        <FooterElement
          firstText="Password remembered "
          secondText="login"
          link="/login"
          isborderTop={true}
        />
      </Footer>
    </FormWrapper>
  );
};

export default SignupForm;
