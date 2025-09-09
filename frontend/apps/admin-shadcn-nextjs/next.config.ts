import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // serverExternalPackages: ["@mastra/*"],
  /* config options here */
  typescript: {
    // 危险：允许构建通过，即使存在类型错误
    ignoreBuildErrors: true, // 适用于 Turbopack 和传统构建[1](@ref)
  },
  /* config options here */
  async rewrites() {
    return [
      {
        // 若依的后端接口
        source: "/admin-api/:path*",
        destination: "http://111.229.110.163:48080/admin-api/:path*",
      },
    ];
  },
};

export default nextConfig;
