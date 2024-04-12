/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "ucarecdn.com" },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/workflows/editor",
        destination: "/workflows", // Matched parameters can be used in the destination
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
