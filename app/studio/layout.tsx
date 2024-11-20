import type { Metadata } from "next";
import "@/app/globals.css";

// Metadata for the studio route
export const metadata: Metadata = {
	title: "Sanity Studio",
	description: "Content Management System",
};

export default function StudioLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
