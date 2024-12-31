"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export default function Loading() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => (prev < 90 ? prev + 10 : prev));
		}, 200);

		const onLoad = () => {
			setProgress(100);
			setTimeout(() => setProgress(0), 500);
		};

		window.addEventListener("load", onLoad);
		return () => {
			clearInterval(interval);
			window.removeEventListener("load", onLoad);
		};
	}, []);

	return (
		<div className='fixed top-0 left-0 w-full h-1 bg-transparent md:h-2'>
			<Progress value={progress} className='h-full' />
		</div>
	);
}
