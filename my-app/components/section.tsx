import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`${className} mt-20 mx-auto w-full max-w-screen-sm`}>
      {children}
    </div>
  );
};

export default Section;