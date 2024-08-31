/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fsmstorage.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "bootdey.com",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [
      "@smithy/util-retry",
      "smithy",
      "@aws-sdk/client-s3",
      "@aws-sdk/middleware-sdk-s3",
      "@aws-sdk/s3-request-presigner",
      "aws-sdk",
    ],
  },
};
export default nextConfig;
