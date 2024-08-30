/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-alpha-sig.figma.com',
      },
      {
        protocol: 'https',
        hostname: 'orisuundocumentsdev.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: 'www.orisuun.com',
      },
      {
        protocol: 'https',
        hostname: 'fast.wistia.com',
      },
    ],
  },
};

export default nextConfig;
