import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: false,
	images: {
		domains: ["cdn.sanity.io", "via.placeholder.com"],
	},
};

export default nextConfig;
