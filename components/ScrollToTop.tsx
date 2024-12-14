"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const pathname = usePathname();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [pathname]);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const windowHeight =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight;
			const progress = (scrollTop / windowHeight) * 100;
			setScrollProgress(progress);
			setIsVisible(scrollTop > 200);
		};
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
					className='fixed z-50 flex items-center justify-center transition-all duration-300 rounded-full shadow-md text-pry bg-slate-100 bottom-4 right-2 md:bottom-8 md:right-8 hover:bg-slate-200'>
					<svg
						className='w-12 h-12'
						viewBox='0 0 36 36'>
						{/* Background circle */}
						<path
							className='text-gray-300'
							d='M18 2.0845a 15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 1 1 0-31.831'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
						/>
						{/* Progress circle */}
						<path
							className='text-blue-600'
							d='M18 2.0845a 15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 1 1 0-31.831'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeDasharray='100'
							strokeDashoffset={`${100 - scrollProgress}`}
							strokeLinecap='round'
						/>
					</svg>
					<IoIosArrowUp className='absolute w-6 h-6' />
				</button>
			)}
		</>
	);
};

export default ScrollToTop;
