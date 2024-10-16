import React, { MouseEventHandler } from 'react';

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({ type, children, className, onClick }) => {
  return (
    <>
      <button
        type={type}
        className={className}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
