import React from "react";

const FormSubmitButton = ({ label }: { label: string }) => {
  return <input type="submit" value={label} className="btn btn-primary" />;
};

export default FormSubmitButton;
