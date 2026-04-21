/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.wp.com",
      },
      {
        protocol: "https",
        hostname: "v6.animekompi.fun",
      },
      {
        protocol: "http",
        hostname: "v6.animekompi.fun",
      },
    ],
  },
}

module.exports = nextConfig