import React from "react";
import { NavigateFunction } from "react-router-dom";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

const Button = ({ onClick, children }: ButtonProps) => (
  <button onClick={onClick}>{children}</button>
);

export default Button;
