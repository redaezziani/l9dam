import React from 'react';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <main className=" flex w-full mt-10 py-4 md:mt-20 min-h-screen font-PixelAE flex-col   justify-start items-center  ">
      {children}
    </main>
  );
};

export default BaseLayout;
