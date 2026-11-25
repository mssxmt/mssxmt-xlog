/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/discography', destination: '/releases', permanent: true },
    ];
  },
};

module.exports = nextConfig;
