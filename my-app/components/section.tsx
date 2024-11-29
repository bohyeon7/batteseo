import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`${className} mt-32 mx-auto max-w-screen-md w-full`}>
      {children}
    </div>
  );
};

export default Section;