import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "example.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3010",
        pathname: "/public/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
