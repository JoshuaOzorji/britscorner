export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const now = new Date();

	// Calculate differences in time
	const secondsDiff: number = Math.floor(
		(now.getTime() - date.getTime()) / 1000,
	);
	const minutesDiff: number = Math.floor(secondsDiff / 60);
	const hoursDiff: number = Math.floor(minutesDiff / 60);
	const daysDiff: number = Math.floor(hoursDiff / 24);

	// Return the formatted date string based on the calculated differences
	if (secondsDiff < 60) {
		return secondsDiff === 1
			? "1 sec ago"
			: `${secondsDiff} secs ago`;
	} else if (minutesDiff < 60) {
		return minutesDiff === 1
			? "1 min ago"
			: `${minutesDiff} mins ago`;
	} else if (hoursDiff < 24) {
		return hoursDiff === 1
			? "1 hour ago"
			: `${hoursDiff} hours ago`;
	} else if (daysDiff === 1) {
		return "yesterday";
	} else if (daysDiff < 30) {
		return `${daysDiff} days ago`;
	} else {
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	}
};
