import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/quiz/python",
        destination: "/python-mcq",
        permanent: true,
      },
      {
        source: "/quiz/sql",
        destination: "/sql-mcq",
        permanent: true,
      },
      {
        source: "/quiz/ml",
        destination: "/ml-interview-mcqs",
        permanent: true,
      },
      {
        source: "/quiz/genai",
        destination: "/genai-interview-mcqs",
        permanent: true,
      },
      // Optional: catch-all for any other /quiz/* to home or a generic handler
      {
        source: "/quiz/:path*",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
