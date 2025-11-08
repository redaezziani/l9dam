import { useEffect, useState } from 'react';

export default function BrandFlip({ t }: { t: (key: string) => string }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setFlipped((prev) => !prev), 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative pixelated w-20 h-20"
      style={{ perspective: '1000px' }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700`}
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 flex p-1 justify-center items-center rounded-full bg-gradient-to-br from-red-700 to-red-900 text-white border-2 border-white/80 font-semibold text-lg"
          style={{
            backfaceVisibility: 'hidden',
            boxShadow: `
              0 10px 30px rgba(0, 0, 0, 0.5),
              inset 0 -2px 8px rgba(0, 0, 0, 0.3),
              inset 0 2px 8px rgba(255, 255, 255, 0.2)
            `,
          }}
        >
          <div
            className="flex w-full -rotate-6 h-full justify-center items-center p-2 text-center border-2 border-white/50 rounded-full"
            style={{
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            {t('fontbrandName')}
          </div>
          {/* Highlight for 3D effect */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 flex p-1 justify-center items-center rounded-full bg-gradient-to-br from-blue-700 to-blue-900 text-white border-2 border-white/80 font-semibold text-lg"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            boxShadow: `
              0 10px 30px rgba(0, 0, 0, 0.5),
              inset 0 -2px 8px rgba(0, 0, 0, 0.3),
              inset 0 2px 8px rgba(255, 255, 255, 0.2)
            `,
          }}
        >
          <div
            className="flex w-full -rotate-6 h-full justify-center items-center p-2 text-center border-2 border-white/50 rounded-full"
            style={{
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            {t('backbrandName')}
          </div>
          {/* Highlight for 3D effect */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)',
            }}
          />
        </div>
      </div>

      {/* Animated Shadow */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/30 rounded-full blur-md transition-all duration-700"
        style={{
          transform: `translateX(-50%) scale(${flipped ? 0.8 : 1})`,
          opacity: flipped ? 0.2 : 0.3,
        }}
      />
    </div>
  );
}
