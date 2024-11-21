// app/api/search/route.ts
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("query");

	if (!query) {
		return NextResponse.json(
			{ message: "No search query provided." },
			{ status: 400 },
		);
	}

	try {
		const results = await client.fetch(
			`
        *[_type == "post" && title match $query || body match $query]{
          _id,
          title,
          slug,
          mainImage {
            asset->{
              url
            },
            alt
          },
          publishedAt,
          shortDescription
        }
      `,
			{ query: `${query}*` }, // Using wildcard search
		);

		return NextResponse.json(results);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error fetching search results." },
			{ status: 500 },
		);
	}
}
