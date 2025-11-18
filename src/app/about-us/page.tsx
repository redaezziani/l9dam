'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import BaseLayout from '../../components/layout/base-layout';

const AboutUsPage = () => {
  const t = useTranslations('AboutFull');

  return (
    <BaseLayout>
      <section className="w-full relative max-w-4xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">{t('title')}</h1>

        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {t('intro')}
        </div>

        <div className="w-full mt-4">
          <div className="aspect-video w-full bg-black/5">
            <div className="relative w-full h-full">
              <iframe
                src={t('videoUrl')}
                title="Lqdam Video"
                className="w-full h-full relative z-0"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* Overlay layers: scanlines + subtle flicker noise + occasional color-shift strip */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ zIndex: 9999 }}
              >
                <div className="absolute inset-0 glitch-scanlines" />
                <div className="absolute inset-0 glitch-noise" />
                <div className="absolute inset-0 glitch-strip" />
              </div>
            </div>
          </div>
        </div>

        <style>{`
          /* Retro overlay styles placed local to component */
          .glitch-scanlines{
            background-image: repeating-linear-gradient(
              rgba(255,255,255,0.03) 0px,
              rgba(255,255,255,0.03) 1px,
              transparent 1px,
              transparent 4px
            );
            opacity: 0.35;
            mix-blend-mode: overlay;
            animation: scanMove 3.2s linear infinite;
          }

          .glitch-noise{
            background: repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(0,0,0,0.02) 1px, rgba(255,255,255,0.01) 2px);
            opacity: 0.14;
            mix-blend-mode: multiply;
            animation: noiseFlicker 2.8s infinite alternate;
            filter: contrast(1.2) brightness(0.95);
          }

          .glitch-strip{
            background: linear-gradient(90deg, transparent 0%, rgba(255,0,50,0.06) 30%, rgba(0,200,255,0.06) 70%, transparent 100%);
            transform: translateX(-10%);
            opacity: 0.06;
            mix-blend-mode: screen;
            animation: stripShift 5.2s infinite;
            backdrop-filter: saturate(1.05) blur(0.2px);
          }

          @keyframes scanMove{
            from{background-position:0 0}
            to{background-position:0 100%}
          }

          @keyframes noiseFlicker{
            0%{opacity:0.03}
            50%{opacity:0.09}
            100%{opacity:0.02}
          }

          @keyframes stripShift{
            0%{opacity:0}
            10%{opacity:0.06; transform:translateX(-12%) scaleX(1.05)}
            30%{opacity:0}
            60%{opacity:0.04; transform:translateX(12%) scaleX(1.02)}
            100%{opacity:0}
          }
        `}</style>

        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          <h2 className="text-lg font-semibold mt-2">
            {t('inspirationTitle')}
          </h2>
          <p className="mt-2">{t('inspiration')}</p>
        </div>

        <div className="w-full mt-2">
          <img
            src={t('heroImage')}
            alt="hero"
            className="w-full object-cover"
          />
        </div>

        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          <h2 className="text-lg font-semibold mt-2">{t('whyTitle')}</h2>
          <p className="mt-2">{t('why')}</p>
        </div>
      </section>
    </BaseLayout>
  );
};

export default AboutUsPage;
