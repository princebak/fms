import React from "react";

const AlertMessage = ({
  content,
  color,
}: {
  content?: string;
  color?: string;
}) => {
  console.log("Message >> ", {
    content,
    color,
  });
  return (
    <div aria-live="polite" className={`alert ${color}`} role="alert">
      {content}
    </div>
  );
};

export default AlertMessage;
