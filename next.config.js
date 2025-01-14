// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
// 	reactStrictMode: true,
// 	swcMinify: true,
// 	images: {
// 		remotePatterns: [
// 			{
// 				protocol: "https",
// 				hostname: "cdn.sanity.io",
// 			},
// 			{
// 				protocol: "https",
// 				hostname: "via.placeholder.com",
// 			},
// 		],
// 	},
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["cdn.sanity.io"],
	},
};

module.exports = nextConfig;
