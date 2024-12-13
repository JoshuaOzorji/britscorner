"use client";
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

const ProgressBar = () => {
	const [progress, setProgress] = useState(0);
	let isNavigating = false;

	useEffect(() => {
		const startLoading = () => {
			if (!isNavigating) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				isNavigating = true;
				setProgress(30);
			}
		};

		const completeLoading = () => {
			if (isNavigating) {
				setProgress(100);
				isNavigating = false;
			}
		};

		const handleLinkClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const link = target.closest("a");

			if (link) {
				const href = link.getAttribute("href");
				// Check if it's an internal link (starts with / or is relative)
				if (
					href &&
					(href.startsWith("/") ||
						!href.includes("://"))
				) {
					startLoading();
				}
			}
		};

		document.addEventListener("click", handleLinkClick);

		// Monitor SPA navigation using pushState, replaceState, and popstate
		const originalPushState = history.pushState;
		const originalReplaceState = history.replaceState;

		history.pushState = function (...args) {
			startLoading();
			const result = originalPushState.apply(history, args);
			completeLoading(); // Assume page is ready after SPA navigation
			return result;
		};

		history.replaceState = function (...args) {
			startLoading();
			const result = originalReplaceState.apply(
				history,
				args,
			);
			completeLoading(); // Assume page is ready after SPA navigation
			return result;
		};

		// Handle back/forward browser navigation
		window.addEventListener("popstate", () => {
			startLoading();
			completeLoading();
		});

		return () => {
			document.removeEventListener("click", handleLinkClick);
			history.pushState = originalPushState;
			history.replaceState = originalReplaceState;
			window.removeEventListener("popstate", completeLoading);
		};
	}, []);

	useEffect(() => {
		if (progress === 100) {
			const timer = setTimeout(() => setProgress(0), 500);
			return () => clearTimeout(timer);
		}
	}, [progress]);

	if (progress === 0) return null;

	return (
		<Progress
			value={progress}
			className='fixed top-0 left-0 z-50 w-full h-1 bg-acc progress-bar'
		/>
	);
};

export default ProgressBar;

// "use client";
// import React, { useState, useEffect } from "react";
// import { Progress } from "@/components/ui/progress";

// const ProgressBar = () => {
// 	const [progress, setProgress] = useState(0);
// 	let isNavigating = false;

// 	useEffect(() => {
// 		const startLoading = () => {
// 			if (!isNavigating) {
// 				isNavigating = true;
// 				setProgress(30);
// 			}
// 		};

// 		const completeLoading = () => {
// 			if (isNavigating) {
// 				setProgress(100);
// 				isNavigating = false;
// 			}
// 		};

// 		// Handles clicks on internal links
// 		const handleLinkClick = (e: MouseEvent) => {
// 			const link = (e.target as HTMLElement)?.closest("a");
// 			if (
// 				link?.href &&
// 				(link.href.startsWith("/") ||
// 					!link.href.includes("://"))
// 			) {
// 				startLoading();
// 			}
// 		};

// 		// Intercept SPA navigation and back/forward browser navigation
// 		const handleNavigation = () => {
// 			startLoading();
// 			completeLoading();
// 		};

// 		document.addEventListener("click", handleLinkClick);
// 		window.addEventListener("popstate", handleNavigation);

// 		// Patch history methods to detect SPA navigation
// 		["pushState", "replaceState"].forEach((method) => {
// 			const originalMethod =
// 				history[method as "pushState" | "replaceState"];
// 			history[method as "pushState" | "replaceState"] =
// 				function (...args) {
// 					startLoading();
// 					const result = originalMethod.apply(
// 						history,
// 						args,
// 					);
// 					completeLoading();
// 					return result;
// 				};
// 		});

// 		return () => {
// 			document.removeEventListener("click", handleLinkClick);
// 			window.removeEventListener(
// 				"popstate",
// 				handleNavigation,
// 			);
// 			["pushState", "replaceState"].forEach((method) => {
// 				const originalMethod =
// 					history[
// 						method as
// 							| "pushState"
// 							| "replaceState"
// 					];
// 				history[
// 					method as "pushState" | "replaceState"
// 				] = originalMethod;
// 			});
// 		};
// 	}, []);

// 	useEffect(() => {
// 		if (progress === 100) {
// 			const timer = setTimeout(() => setProgress(0), 500); // Reset after 0.5s
// 			return () => clearTimeout(timer);
// 		}
// 	}, [progress]);

// 	if (progress === 0) return null;

// 	return (
// 		<Progress
// 			value={progress}
// 			className='fixed top-0 left-0 z-50 w-full h-1 bg-acc progress-bar'
// 		/>
// 	);
// };

// export default ProgressBar;
