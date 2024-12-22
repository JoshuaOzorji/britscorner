// import { NextResponse } from "next/server";
// import { client } from "@/sanity/lib/client";

// export async function POST(
// 	req: Request,
// 	{ params }: { params: { id: string } },
// ) {
// 	const { id } = params;

// 	if (!id) {
// 		return NextResponse.json(
// 			{ error: "Post ID is required" },
// 			{ status: 400 },
// 		);
// 	}

// 	try {
// 		await client
// 			.patch(id)
// 			.setIfMissing({ views: 0 })
// 			.inc({ views: 1 })
// 			.commit();

// 		return NextResponse.json({ success: true });
// 	} catch (error) {
// 		console.error("Error updating views:", error);
// 		return NextResponse.json(
// 			{ error: "Failed to update views" },
// 			{ status: 500 },
// 		);
// 	}
// }

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
		await client
			.patch(id)
			.setIfMissing({ views: 0 })
			.inc({ views: 1 })
			.commit();

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error updating views:", error);
		return NextResponse.json(
			{ error: "Failed to update views" },
			{ status: 500 },
		);
	}
}
