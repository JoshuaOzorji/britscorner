"use client";
import { useEffect, useState } from "react";

interface ClientViewUpdaterProps {
	postId: string;
	initialViews: number;
}

const ClientViewUpdater = ({
	postId,
	initialViews,
}: ClientViewUpdaterProps) => {
	const [views, setViews] = useState(initialViews);

	useEffect(() => {
		const updateViews = async () => {
			try {
				const response = await fetch(
					`/api/views/${postId}`,
					{
						method: "POST",
					},
				);

				if (!response.ok) {
					console.error(
						"Failed to update views",
						await response.json(),
					);
					return;
				}

				const data = await response.json();
				setViews(data.views);
			} catch (error) {
				console.error("Error updating views:", error);
			}
		};

		const viewedPosts = JSON.parse(
			sessionStorage.getItem("viewedPosts") || "[]",
		);
		if (!viewedPosts.includes(postId)) {
			updateViews();
			sessionStorage.setItem(
				"viewedPosts",
				JSON.stringify([...viewedPosts, postId]),
			);
		}
	}, [postId]);

	return (
		<div className='font-inconsolata text-sec'>
			<p>Views: {views}</p>
		</div>
	);
};

export default ClientViewUpdater;
