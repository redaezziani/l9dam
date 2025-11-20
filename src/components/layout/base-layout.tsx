import React from 'react';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <main className=" flex  w-full pb-4 mt-8  md:mt-20   flex-col   justify-start items-center  ">
      {children}
    </main>
  );
};

export default BaseLayout;
