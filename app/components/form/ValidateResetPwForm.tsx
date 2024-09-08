"use client";

import React from "react";
import { useSelector } from "react-redux";
import { sendEmailWithEmailJs } from "@/services/NotificationService";
import { emailMetadata } from "@/utils/constants";
import Link from "next/link";
import FormWrapper from "@/app/components/form/FormWrapper";

const ValidateResetPwForm = () => {
  const { justRegisteredUser } = useSelector((state: any) => state.user);

  const handleResendValidationCode = async (e: any) => {
    e.preventDefault();
    await sendEmailWithEmailJs({
      receiver: justRegisteredUser,
      subject: emailMetadata.SUBJECT_RESET_PW_VALIDATION,
      validationLink: emailMetadata.RESET_PW_VALIDATION_LINK,
    });
    console.log("validation code resent");
  };

  return (
    <FormWrapper formLabel="Validate reset password">
      <form onClick={handleResendValidationCode}>
        <div className="d-flex flex-column mt-3">
          <label className="form-text">
            <p>
              Click on the <em>reset paswword</em> validation link sent in your
              mail box;
            </p>
          </label>
          <label className="form-text" style={{ borderTop: "solid 1px #ddd" }}>
            {"Link not received ?"}{" "}
            <Link type="submit" href={"#"}>
              resend it
            </Link>
          </label>
        </div>
      </form>
    </FormWrapper>
  );
};

export default ValidateResetPwForm;
