/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ["imagesoflezio04059-dev"],
    remotePatterns: [
      {
        hostname: "imagesoflezio04059-dev.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
};
