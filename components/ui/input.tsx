"use client";
import React from "react";

type InputValue =
  | string
  | readonly string[]
  | number
  | undefined
  | File
  | (string | File)[]
  | boolean;

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> & {
  className?: string;
  value?: InputValue;
};

type NonFileValue = Exclude<InputValue, File | boolean | (string | File)[]>;

export function Input({ type, value, ...props }: InputProps) {
  if (type === "file") {
    return <input type="file" {...props} />;
  }

  return <input type={type} {...props} value={value as NonFileValue} />;
}
