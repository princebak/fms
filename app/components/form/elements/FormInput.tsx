"use client";

import React, { ChangeEventHandler, FC } from "react";

type InputProps = {
  label: string;
  type: string;
  id?: string;
  name?: string;
  value?: string;
  placeHolder?: string;
  title?: string;
  error?: string;
  required?: boolean;
  readonly?: boolean;
  handleChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

const FormInput: FC<InputProps> = ({
  label,
  type,
  id,
  name,
  error,
  value,
  placeHolder,
  title,
  required,
  readonly,
  handleChange,
}) => {
  if (!placeHolder) {
    switch (type) {
      case "password":
        placeHolder = "********";
        break;
      case "email":
        placeHolder = "bakengailunga@gmail.com";
        break;
      case "tel":
        placeHolder = "+243828414084";
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        name={name}
        aria-describedby={`${name}Help`}
        value={value}
        placeholder={placeHolder}
        title={title}
        required={required}
        readOnly={readonly}
        onChange={handleChange}
      />
      {error ? (
        <div id={`${name}Help`} className="form-text text-danger">
          {error}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FormInput;
