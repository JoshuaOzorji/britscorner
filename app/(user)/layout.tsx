import "@/app/globals.css";
import {
	Poppins,
	Gothic_A1,
	Inconsolata,
	Josefin_Sans,
} from "next/font/google";
import BaseLayout from "@/components/BaseLayout";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import ProgressBar from "@/components/ProgressBar";
import ScrollToTop from "@/components/ScrollToTop";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "BlitsCorner",
	description: "A blog about web development and programming",
};

const poppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	display: "swap",
	weight: "400",
});

const gothic = Gothic_A1({
	subsets: ["latin"],
	variable: "--font-gothic",
	display: "swap",
	weight: "400",
});

const inconsolata = Inconsolata({
	subsets: ["latin"],
	variable: "--font-inconsolata",
	display: "swap",
	weight: ["400", "500", "600", "700"],
	adjustFontFallback: false,
});

const josefin = Josefin_Sans({
	subsets: ["latin"],
	variable: "--font-josefin",
	display: "swap",
	weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${poppins.variable} ${gothic.variable} ${inconsolata.variable} ${josefin.variable} antialiased`}>
				<Suspense fallback={null}>
					<ErrorBoundary fallback={<></>}>
						<ProgressBar />
					</ErrorBoundary>
					<ScrollToTop />
				</Suspense>

				<BaseLayout>
					<Suspense fallback={null}>
						<main>{children}</main>
					</Suspense>
					<Toaster
						position='bottom-center'
						reverseOrder={false}
					/>
				</BaseLayout>
			</body>
		</html>
	);
}
