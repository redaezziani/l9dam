import Link from 'next/link';
import React from 'react';

interface AnimatedBtnProps {
  children: React.ReactNode;
  href?: string;
}

const AnimatedBtn = ({ children, href = '/' }: AnimatedBtnProps) => {
  return (
    <Link
      className=" relative z-10"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <button className=" z-9999999  w-[170px] rounded-[20px] bg-primary text-white   leading-10 text-center no-underline pl-5 transition-transform duration-200 ease-in-out hover:scale-105 ">
        {children}
      </button>
      <img
        src="https://media.giphy.com/media/l41K1gfrUz1HDohvG/100.gif"
        alt="animated icon"
        className="absolute left-0 -top-2 w-10 h-10 object-contain pointer-events-none z-9999999999"
      />
    </Link>
  );
};

export default AnimatedBtn;
