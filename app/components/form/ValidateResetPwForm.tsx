"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { sendEmailWithEmailJs } from "@/services/NotificationService";
import { emailMetadata } from "@/utils/constants";
import Link from "next/link";
import FormWrapper from "@/app/components/form/FormWrapper";
import { AlertMessageClass } from "@/classes";
import Loader from "../Loader";
import AlertMessage from "../AlertMessage";

const ValidateResetPwForm = () => {
  const { justRegisteredUser } = useSelector((state: any) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<AlertMessageClass | null>(null);

  const handleResendValidationCode = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    const res: any = await sendEmailWithEmailJs({
      receiver: justRegisteredUser,
      subject: emailMetadata.SUBJECT_RESET_PW_VALIDATION,
      validationLink: emailMetadata.RESET_PW_VALIDATION_LINK,
    });

    if (res?.error) {
      setMessage({ content: res.error, color: "alert-danger" });
    } else {
      setMessage({
        content: "The reset password link resent with success !",
        color: "alert-success",
      });
    }
    setIsLoading(false);

    console.log("validation code resent");
  };

  return (
    <FormWrapper formLabel="Validate reset password">
      {message && (
        <AlertMessage content={message.content} color={message?.color} />
      )}
      <label className="form-text">
        <p>
          Click on the <em>reset paswword</em> validation link sent in your mail
          box;
        </p>
      </label>
      <label className="form-text" style={{ borderTop: "solid 1px #ddd" }}>
        {"Link not received ?"}{" "}
        {isLoading ? (
          <Loader />
        ) : (
          <Link type="submit" href={"#"} onClick={handleResendValidationCode}>
            resend it
          </Link>
        )}
      </label>
    </FormWrapper>
  );
};

export default ValidateResetPwForm;
