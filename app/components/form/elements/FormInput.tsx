import React, { FC } from "react";

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
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        aria-describedby={`${name}Help`}
        value={value}
        placeholder={placeHolder}
        title={title}
        required={required}
        readOnly={readonly}
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
