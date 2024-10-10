import React from 'react';

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  value: React.ReactNode;
  className: string;
}

const Button: React.FC<ButtonProps> = ({ type, value, className }) => {
  return (
    <>
      <button
        type={type}
        className={className}
      >
        {value}
      </button>
    </>
  );
};

export default Button;
