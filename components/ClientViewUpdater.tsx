"use client";

import { useEffect } from "react";

export default function ClientViewUpdater({ postId }: { postId: string }) {
	useEffect(() => {
		const sendViewCount = async () => {
			if (postId) {
				await fetch(`/api/views/${postId}`, {
					method: "POST",
				});
			}
		};

		sendViewCount();
	}, [postId]);

	return null;
}
