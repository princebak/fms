import React from "react";

const Footer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {children}
    </div>
  );
};

export default Footer;
