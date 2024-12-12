"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";

export default function ProgressBar() {
	const [progress, setProgress] = useState(0);
	const pathname = usePathname();

	useEffect(() => {
		if (!pathname) return;
		setProgress(30);
		const timer = setTimeout(() => setProgress(100), 1000);

		return () => {
			clearTimeout(timer);
			setProgress(0);
		};
	}, [pathname]);

	useEffect(() => {
		if (progress === 100) {
			const timer = setTimeout(() => setProgress(0), 500);
			return () => clearTimeout(timer);
		}
	}, [progress]);

	return (
		<>
			{progress > 0 && (
				<Progress
					value={progress}
					className='fixed top-0 left-0 w-full h-1'
				/>
			)}
		</>
	);
}
