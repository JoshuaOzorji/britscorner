import Header from "@/components/Header";
import Footer from "./Footer";
import { Suspense } from "react";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Suspense fallback={null}>
			<div className='flex flex-col min-h-screen bg-[#f9f9f9]'>
				<Header />
				<div className='flex-1 mx-4 my-2 md:my-6 md:mx-10'>
					{children}
				</div>
				<Footer />
			</div>
		</Suspense>
	);
};

export default BaseLayout;
