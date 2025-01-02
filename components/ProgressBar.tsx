// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { Progress } from "@/components/ui/progress";

// const ProgressBar = () => {
// 	const [progress, setProgress] = useState(0);
// 	const [isNavigating, setIsNavigating] = useState(false);

// 	const startLoading = useCallback(() => {
// 		if (!isNavigating) {
// 			setIsNavigating(true);
// 			setProgress(30); // Start the progress bar at 30%
// 		}
// 	}, [isNavigating]);

// 	const completeLoading = useCallback(() => {
// 		if (isNavigating) {
// 			setProgress(100); // Move the progress bar to 100%
// 			const timeout = setTimeout(() => {
// 				setProgress(0); // Reset the progress bar
// 				setIsNavigating(false); // Allow the progress bar to start again
// 			}, 500); // Delay to simulate completion

// 			return () => clearTimeout(timeout); // Cleanup timeout
// 		}
// 	}, [isNavigating]);

// 	useEffect(() => {
// 		const handleLinkClick = (e: MouseEvent) => {
// 			const target = e.target as HTMLElement;
// 			const link = target.closest("a");

// 			if (link?.getAttribute("href")?.match(/^\/|^[^:]+$/)) {
// 				startLoading();
// 			}
// 		};

// 		const handleHistoryChange = () => {
// 			startLoading();
// 			setTimeout(completeLoading, 500); // Simulate navigation duration
// 		};

// 		document.addEventListener("click", handleLinkClick);
// 		window.addEventListener("popstate", handleHistoryChange);

// 		const originalPushState = history.pushState;
// 		const originalReplaceState = history.replaceState;

// 		history.pushState = function (...args) {
// 			handleHistoryChange();
// 			return originalPushState.apply(this, args);
// 		};

// 		history.replaceState = function (...args) {
// 			handleHistoryChange();
// 			return originalReplaceState.apply(this, args);
// 		};

// 		return () => {
// 			document.removeEventListener("click", handleLinkClick);
// 			window.removeEventListener(
// 				"popstate",
// 				handleHistoryChange,
// 			);
// 			history.pushState = originalPushState;
// 			history.replaceState = originalReplaceState;
// 		};
// 	}, [startLoading, completeLoading]);

// 	if (progress === 0) return null;

// 	return (
// 		<Progress
// 			value={progress}
// 			className='fixed top-0 left-0 z-50 w-full h-1 bg-acc progress-bar'
// 		/>
// 	);
// };

// export default ProgressBar;

"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Progress } from "@/components/ui/progress";

const ProgressBar = () => {
	const [progress, setProgress] = useState(0);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const startLoading = useCallback(() => {
		if (!timeoutRef.current) {
			setProgress(30);
		}
	}, []);

	const completeLoading = useCallback(() => {
		setProgress(100);

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			setProgress(0);
			timeoutRef.current = null;
		}, 500);
	}, []);

	useEffect(() => {
		const handleLinkClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const link = target.closest("a");

			if (link?.getAttribute("href")?.match(/^\/|^[^:]+$/)) {
				startLoading();
			}
		};

		const handleNavigation = () => {
			startLoading();
			requestAnimationFrame(() => {
				setTimeout(completeLoading, 500);
			});
		};

		document.addEventListener("click", handleLinkClick);
		window.addEventListener("popstate", handleNavigation);

		const originalPushState = history.pushState;
		const originalReplaceState = history.replaceState;

		history.pushState = function (
			...args: Parameters<typeof originalPushState>
		) {
			const result = originalPushState.apply(this, args);
			handleNavigation();
			return result;
		};

		history.replaceState = function (
			...args: Parameters<typeof originalReplaceState>
		) {
			const result = originalReplaceState.apply(this, args);
			handleNavigation();
			return result;
		};

		return () => {
			document.removeEventListener("click", handleLinkClick);
			window.removeEventListener(
				"popstate",
				handleNavigation,
			);
			history.pushState = originalPushState;
			history.replaceState = originalReplaceState;

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [startLoading, completeLoading]);

	if (progress === 0) return null;

	return (
		<Progress
			value={progress}
			className='fixed top-0 left-0 z-50 w-full h-1 bg-acc progress-bar'
		/>
	);
};

export default ProgressBar;
