// "use client";

// import { useEffect } from "react";
// import { usePathname } from "next/navigation";

// const ScrollToTop = () => {
// 	const pathname = usePathname();

// 	useEffect(() => {
// 		window.scrollTo({ top: 0, behavior: "smooth" });
// 	}, [pathname]);

// 	return null;
// };

// export default ScrollToTop;

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SlArrowUp } from "react-icons/sl";

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	const pathname = usePathname();

	// Scroll to top on route change
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [pathname]);

	// Show or hide the scroll-to-top button based on scroll position
	useEffect(() => {
		const handleScroll = () => setIsVisible(window.scrollY > 300);

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () =>
		window.scrollTo({ top: 0, behavior: "smooth" });

	return (
		<>
			{isVisible && (
				<button
					onClick={scrollToTop}
					aria-label='Scroll to top'
					className='fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300'>
					<SlArrowUp className='w-6 h-6' />
				</button>
			)}
		</>
	);
};

export default ScrollToTop;
