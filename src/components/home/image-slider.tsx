'use client';
import { useRef } from 'react';

const ImageSlider = () => {
  const images = [
    '/images/slider/image-1.png',
    '/images/slider/image-2.png',
    '/images/slider/image-3.png',
  ];
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  return (
    <section className="relative max-w-96">
      <div
        ref={scrollRef}
        className="overflow-x-scroll old-scrollbar flex gap-4 w w-full snap-x snap-mandatory"
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Product Image ${index + 1}`}
            className="w-full shrink-0 snap-center"
          />
        ))}
      </div>
      <button
        onClick={scrollLeft}
        className="absolute z-9999 left-1 h-10 top-1/2  -translate-y-1/2 border! rounded-none! bg-[#b1aea1]  border-[#b1aea1] p-2 hover:bg-[#b1aea1]"
        type="button"
      >
        <svg
          className="w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M16 5v2h-2V5h2zm-4 4V7h2v2h-2zm-2 2V9h2v2h-2zm0 2H8v-2h2v2zm2 2v-2h-2v2h2zm0 0h2v2h-2v-2zm4 4v-2h-2v2h2z"
            fill="currentColor"
          />
        </svg>
      </button>
      <button
        onClick={scrollRight}
        className="absolute z-9999 right-1 h-10!  top-1/2 -translate-y-1/2 bg-[#b1aea1] border! rounded-none! border-[#b1aea1] p-2 hover:bg-[#b1aea1]"
        type="button"
      >
        <svg
          className="w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          {' '}
          <path
            d="M8 5v2h2V5H8zm4 4V7h-2v2h2zm2 2V9h-2v2h2zm0 2h2v-2h-2v2zm-2 2v-2h2v2h-2zm0 0h-2v2h2v-2zm-4 4v-2h2v2H8z"
            fill="currentColor"
          />{' '}
        </svg>
      </button>
    </section>
  );
};

export default ImageSlider;
