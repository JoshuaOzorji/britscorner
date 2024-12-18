import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const { id } = req.query;

		try {
			await client
				.patch(id as string)
				.setIfMissing({ views: 0 })
				.inc({ views: 1 })
				.commit();

			res.status(200).json({
				message: "View count incremented",
			});
		} catch (error) {
			res.status(500).json({
				message: "Failed to update view count",
				error,
			});
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).json({
			message: `Method ${req.method} Not Allowed`,
		});
	}
}
