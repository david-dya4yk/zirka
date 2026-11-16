import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  sassOptions: {
    loadPaths: [path.join(process.cwd(), 'src', 'styles')],
    includePaths: [path.join(process.cwd(), 'src', 'styles')],
    additionalData: `@use 'index' as *;\n`,
  },
  // Hero frames are fetched by URL with ?v=… (HeroSection/stages.ts), so they can be cached hard
  // and the scroll animation never waits on revalidation.
  headers() {
    return Promise.resolve([
      {
        source: '/frames/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]);
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
