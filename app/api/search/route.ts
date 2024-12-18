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
		// Fetch authors separately to get distinct author info
		const authors = await client.fetch(
			`
			*[
				_type == "author" &&
				name match $query
			]{
				_id,
				name,
				slug,
				image {
					asset->{
						url
					}
				}
			}
			`,
			{ query: `${query}*` } as QueryParams,
		);

		// Fetch posts related to the query
		const posts = await client.fetch(
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
					_id,
					name,
					slug,
					image {
						asset->{
							url
						}
					}
				},
				tags[]->{
					name,
					slug
				}
			}
			`,
			{ query: `${query}*` } as QueryParams,
		);

		if (authors.length === 0 && posts.length === 0) {
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
						slug,
						image {
							asset->{
								url
							}
						}
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

		// Return both authors and posts as separate objects
		return NextResponse.json({ authors, posts });
	} catch (error) {
		console.error("Search error:", error);
		return NextResponse.json(
			{ message: "Error fetching search results." },
			{ status: 500 },
		);
	}
}
