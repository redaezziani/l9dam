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
        className="absolute z-9999 left-1 h-10 top-1/2 win7-btn -translate-y-1/2 border! rounded-none! bg-[#b1aea1]  border-[#b1aea1] p-2 hover:bg-[#b1aea1]"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="#908e85"
        >
          <path d="M10.5 3L9.5 2 3.5 8l6 6 1-1-5-5z" />
        </svg>
      </button>
      <button
        onClick={scrollRight}
        className="absolute z-9999 right-1 h-10! win7-btn top-1/2 -translate-y-1/2 bg-[#b1aea1] border! rounded-none! border-[#b1aea1] p-2 hover:bg-[#b1aea1]"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="#908e85"
        >
          <path d="M5.5 13l1 1 6-6-6-6-1 1 5 5z" />
        </svg>
      </button>
    </section>
  );
};

export default ImageSlider;
