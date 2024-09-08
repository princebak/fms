import React from "react";

const AuthLayout = ({ children }: any) => {
  return (
    <div
      className=" d-flex justify-content-center"
      style={{ minHeight: "82vh" }}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
