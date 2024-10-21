import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`${className} border-2 mt-32 mx-auto max-w-screen-lg w-full`}>
      {children}
    </div>
  );
};

export default Section;