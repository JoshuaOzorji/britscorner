"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Progress } from "@/components/ui/progress";

// Debounce helper function
function debounce(fn: () => void, delay: number) {
	let timer: NodeJS.Timeout | null = null;
	return () => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(fn, delay);
	};
}

const ProgressBar = () => {
	const [progress, setProgress] = useState(0);
	const [isNavigating, setIsNavigating] = useState(false);

	const startLoading = useCallback(() => {
		if (!isNavigating) {
			setIsNavigating(true);
			setProgress(30);
		}
	}, [isNavigating]);

	const completeLoading = useCallback(() => {
		if (isNavigating) {
			setProgress(100);
			setTimeout(() => {
				setProgress(0);
				setIsNavigating(false);
			}, 500);
		}
	}, [isNavigating]);

	const debouncedStartLoading = useMemo(
		() => debounce(startLoading, 50),
		[startLoading],
	);

	useEffect(() => {
		const handleLinkClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const link = target.closest("a");

			if (link) {
				const href = link.getAttribute("href");
				if (
					href &&
					(href.startsWith("/") ||
						!href.includes("://"))
				) {
					debouncedStartLoading();
				}
			}
		};

		const originalPushState = history.pushState;
		const originalReplaceState = history.replaceState;

		const wrappedPushState = function (
			...args: Parameters<typeof history.pushState>
		) {
			debouncedStartLoading();
			const result = originalPushState.apply(history, args);
			completeLoading();
			return result;
		};

		const wrappedReplaceState = function (
			...args: Parameters<typeof history.replaceState>
		) {
			debouncedStartLoading();
			const result = originalReplaceState.apply(
				history,
				args,
			);
			completeLoading();
			return result;
		};

		document.addEventListener("click", handleLinkClick);
		history.pushState = wrappedPushState;
		history.replaceState = wrappedReplaceState;
		window.addEventListener("popstate", completeLoading);

		return () => {
			document.removeEventListener("click", handleLinkClick);
			history.pushState = originalPushState;
			history.replaceState = originalReplaceState;
			window.removeEventListener("popstate", completeLoading);
		};
	}, [debouncedStartLoading, completeLoading]);

	if (progress === 0) return null;

	return (
		<Progress
			value={progress}
			className='fixed top-0 left-0 z-50 w-full h-1 bg-acc progress-bar'
		/>
	);
};

export default ProgressBar;
