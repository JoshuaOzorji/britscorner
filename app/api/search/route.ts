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
		// Primary Search
		const results = await client.fetch(
			`
      *[
        _type == "post" &&
        (
          title match $query ||
          body match $query ||
          shortDescription match $query ||
          author->name match $query ||
          tags[]->name match $query
        )
      ]{
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
        shortDescription,
        author->{
          name,
          slug
        },
        tags[]->{
          name,
          slug
        }
      }
      `,
			{ query: `${query}*` } as QueryParams,
		);

		if (results.length === 0) {
			const relatedResults = await client.fetch(
				`
        *[_type == "post"] | order(publishedAt desc)[0...5] {
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
          shortDescription,
          author->{
            name,
            slug
          },
          tags[]->{
            name,
            slug
          }
        }
        `,
			);

			return NextResponse.json({
				message: "No exact matches found. Here are some related results.",
				relatedResults,
			});
		}

		return NextResponse.json(results);
	} catch (error) {
		console.error("Search error:", error);
		return NextResponse.json(
			{ message: "Error fetching search results." },
			{ status: 500 },
		);
	}
}
