import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: Request, context: { params: { id: string } }) {
	const { id } = context.params;

	if (!id) {
		return NextResponse.json(
			{ error: "Post ID is required" },
			{ status: 400 },
		);
	}

	try {
		// First, get the current post to ensure we're working with the latest data
		const post = await client.fetch(
			`*[_type == "post" && _id == $id][0]{ views }`,
			{ id },
		);

		const currentViews = post?.views || 0;

		// Update the views count
		const updatedPost = await client
			.patch(id)
			.set({ views: currentViews + 1 })
			.commit();

		return NextResponse.json({
			success: true,
			views: updatedPost.views,
		});
	} catch (error) {
		console.error("Error updating views:", error);
		return NextResponse.json(
			{ error: "Failed to update views" },
			{ status: 500 },
		);
	}
}
