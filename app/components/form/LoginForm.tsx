"use client";

import React, { useEffect, useState } from "react";
import FormWrapper from "./FormWrapper";
import FormInput from "./elements/FormInput";
import FormSubmitButton from "./elements/FormSubmitButton";
import { useRouter, useSearchParams } from "next/navigation";
import FooterElement from "./elements/FooterElement";
import Footer from "./elements/Footer";
import { useDispatch, useSelector } from "react-redux";
import { signIn, useSession } from "next-auth/react";
import { loginSuccess } from "@/redux/slices/userSlice";
import { logMessage } from "@/utils/constants";
import AlertMessage from "../AlertMessage";
import { AlertMessageClass } from "@/classes";
import { updateSubscription } from "@/redux/slices/subscriptionSlice";

const LoginForm = ({ getUserLastActiveSubscription }: any) => {
  // LOGIN FORM FIELDS INITIAL VALUES
  const initialValues = {
    email: "",
    password: "",
  };

  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const actived = useSearchParams().get("actived"); // This is the validation token
  const [isJustLoggedIn, setIsJustLoggedIn] = useState(false);
  const [form, setForm] = useState(initialValues);
  const [message, setMessage] = useState<AlertMessageClass | undefined | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUserLastActiveSubscription = async () => {
      const user: any = session?.user;
      const lastActiveSubscription: any = await getUserLastActiveSubscription(
        user?._id
      );
      console.log(
        "useEffect lastActiveSubscription  >>",
        lastActiveSubscription
      );
      if (lastActiveSubscription) {
        dispatch(
          updateSubscription(updateSubscription(lastActiveSubscription))
        );
      }
    };

    const loadUserInReduxStore = async () => {
      if (isJustLoggedIn) {
        if (
          (!currentUser && session?.user) ||
          (currentUser && currentUser?.email !== session?.user?.email)
        ) {
          dispatch(loginSuccess(session?.user));
        }

        await loadUserLastActiveSubscription();

        setIsJustLoggedIn(false);
      }
    };

    loadUserInReduxStore();
  }, [isJustLoggedIn]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    const loginForm = {
      email: form.email,
      password: form.password,
      redirect: false,
    };
    const res: any = await signIn("credentials", loginForm);

    if (res.error) {
      setMessage({ content: res.error, color: "alert-danger" });

      if (res.error === logMessage.USER_NOT_ACTIVE) {
        router.replace("/validate-email");
      } else {
        setIsLoading(false);
      }
    } else {
      setIsJustLoggedIn(true);

      router.push("/dashboard");
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <FormWrapper formLabel="Login" handleSubmit={handleSubmit}>
      {message && (
        <AlertMessage content={message?.content} color={message?.color} />
      )}

      {actived && (
        <AlertMessage
          content={"Email validation done with success, you can login now."}
          color={"alert-success"}
        />
      )}
      <FormInput
        id={"email"}
        name={"email"}
        type="email"
        label="Email address"
        value={form.email}
        handleChange={handleChange}
        required
      />
      <FormInput
        id={"password"}
        name={"password"}
        type="password"
        label="Password"
        value={form.password}
        handleChange={handleChange}
        required
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
          firstText="Password forgotten "
          secondText="reset it"
          link="/reset-password"
        />
      </Footer>
    </FormWrapper>
  );
};

export default LoginForm;
