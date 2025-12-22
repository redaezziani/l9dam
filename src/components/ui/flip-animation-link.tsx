'use client';
import Link from 'next/link';

interface FlipAnimationLinkProps {
  locale: string;
}

export default function FlipAnimationLink({ locale }: FlipAnimationLinkProps) {
  return (
    <Link href={'/store'} className=" fixed bottom-2 z-99999999">
      <img
        src={`/images/flip-animation-${locale}.gif`}
        alt="flip-bu"
        className="w-28 pixelated h-28"
      />
    </Link>
  );
}
