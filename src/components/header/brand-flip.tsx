import { useEffect, useState } from 'react';

export default function BrandFlip({ t }: { t: (key: string) => string }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setFlipped((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-28 h-28 [perspective:1000px]">
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div className="absolute inset-0 flex justify-center items-center rounded-full bg-red-700 text-white border border-white/80 font-bold text-2xl md:text-3xl [backface-visibility:hidden]">
          {t('fontbrandName')}
        </div>

        <div className="absolute inset-0 flex justify-center items-center rounded-full bg-red-800 text-white border border-white/80 font-semibold text-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
          {t('backbrandName')}
        </div>
      </div>
    </div>
  );
}
