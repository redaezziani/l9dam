import { useEffect, useState } from 'react';

export default function BrandFlip({ t }: { t: (key: string) => string }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setFlipped((prev) => !prev), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-24 h-24 [perspective:1000px]">
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div className="absolute inset-0 flex p-1 justify-center items-center rounded-full bg-red-800 text-white border border-white/80 font-bold text-xl  [backface-visibility:hidden]">
          <div className="flex w-full h-full justify-center items-center p-2 text-center border border-white/50 rounded-full">
            {t('fontbrandName')}
          </div>
        </div>

        <div className="absolute inset-0 flex p-1 justify-center items-center rounded-full bg-blue-800 text-white border border-white/80 font-semibold text-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex w-full h-full justify-center items-center p-2 text-center border border-white/50 rounded-full">
            {t('backbrandName')}
          </div>
        </div>
      </div>
    </div>
  );
}
