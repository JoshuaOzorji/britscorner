"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export default function Loading() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => (prev < 90 ? prev + 10 : prev)); // Increase up to 90%
		}, 200);

		const onLoad = () => {
			setProgress(100); // Set to 100% when the page is ready
			setTimeout(() => setProgress(0), 500); // Reset after delay
		};

		window.addEventListener("load", onLoad); // Page load event

		return () => {
			clearInterval(interval);
			window.removeEventListener("load", onLoad);
		};
	}, []);

	return (
		<div className='fixed top-0 left-0 w-full h-1 md:h-2 bg-transparent'>
			<Progress value={progress} className='h-full' />
		</div>
	);
}
