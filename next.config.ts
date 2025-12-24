import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const strapiHostname = new URL(strapiUrl).hostname;
const strapiPort = new URL(strapiUrl).port;
const strapiProtocol = new URL(strapiUrl).protocol.replace(':', '');

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: strapiProtocol as 'http' | 'https',
        hostname: strapiHostname,
        port: strapiPort,
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
