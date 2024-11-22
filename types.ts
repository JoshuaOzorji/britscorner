import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { QueryParams } from "sanity";

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
        *[
          _type == "post" &&
          (title match $query || 
          tags[].name match $query || 
          author->name match $query)
        ]{
          _id,
          title,
          slug,
          author->{
            name,
            slug
          },
          mainImage {
            asset->{
              url
            },
            alt
          },
          categories[]->{
            title
          },
          tags[]->{
            name
          },
          publishedAt,
          shortDescription
        }
      `,
			{ query: `${query}*` } as QueryParams,
		);

		return NextResponse.json(results);
	} catch (error) {
		// Handle unused `error` warning
		console.error("Error fetching search results:", error);
		return NextResponse.json(
			{ message: "Error fetching search results." },
			{ status: 500 },
		);
	}
}
