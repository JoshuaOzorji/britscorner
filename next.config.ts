import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
			{
				protocol: "https",
				hostname: "via.placeholder.com",
			},
		],
	},
};

export default nextConfig;
