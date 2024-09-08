"use client";

import React from "react";
import Loader from "../../Loader";

const FormSubmitButton = ({
  label,
  isLoading,
}: {
  label: string;
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <input type="submit" value={label} className="btn btn-primary" />
      )}
    </>
  );
};

export default FormSubmitButton;
