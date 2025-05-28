import React from "react";
import "./button.scss";
import { mapModifiers } from "../../../libs/component";

interface IButtonProps {
  label: string | React.ReactNode; 
  onClick: () => void; 
  type?: "button" | "submit" | "reset"; 
  variant?: "primary" | "secondary" | "danger"; 
  disabled?: boolean; 
}

const Button: React.FC<IButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  const componentClassName = `a-button`;

  return (
    <button
      className={mapModifiers(componentClassName,variant,type)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;