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
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
