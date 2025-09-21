
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
  },
  // This is to allow the Next.js dev server to accept requests from the
  // Firebase Studio development environment.
  allowedDevOrigins: [
      'https://6000-firebase-studio-1758295669038.cluster-y3k7ko3fang56qzieg3trwgyfg.cloudworkstations.dev',
  ],
};

export default nextConfig;
