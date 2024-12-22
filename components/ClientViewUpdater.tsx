// "use client";
// import { useEffect } from "react";

// interface ClientViewUpdaterProps {
// 	postId: string;
// }

// const ClientViewUpdater = ({ postId }: ClientViewUpdaterProps) => {
// 	useEffect(() => {
// 		const updateViews = async () => {
// 			try {
// 				await fetch(`/api/views/${postId}`, {
// 					method: "POST",
// 				});
// 			} catch (error) {
// 				console.error("Error updating views:", error);
// 			}
// 		};

// 		updateViews();
// 	}, [postId]);

// 	return null;
// };

// export default ClientViewUpdater;

"use client";
import { useEffect } from "react";

interface ClientViewUpdaterProps {
	postId: string;
}

const ClientViewUpdater = ({ postId }: ClientViewUpdaterProps) => {
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
				}
			} catch (error) {
				console.error("Error updating views:", error);
			}
		};

		updateViews();
	}, [postId]);

	return null;
};

export default ClientViewUpdater;
