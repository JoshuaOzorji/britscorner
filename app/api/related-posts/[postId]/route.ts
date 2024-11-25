import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(
	request: Request,
	{ params }: { params: { postId: string } },
) {
	const { postId } = params;
	const { searchParams } = new URL(request.url);
	const exclude = searchParams.get("exclude")?.split(",") || [];
	const limit = parseInt(searchParams.get("limit") || "5", 10);

	try {
		// Fetch the current post's tags and categories
		const currentPost = await client.fetch(
			`*[_type == "post" && _id == $postId][0] {
        tags[]->_id,
        categories[]->_id
      }`,
			{ postId },
		);

		if (!currentPost) {
			return NextResponse.json(
				{ error: "Post not found" },
				{ status: 404 },
			);
		}

		const { tags = [], categories = [] } = currentPost;

		// Query related posts based on tags and categories
		const relatedPosts = await client.fetch(
			`*[_type == "post" && _id != $postId && !(_id in $excludedPosts)] | 
        score(tags[]._ref in $tags) +
        score(categories[]._ref in $categories) 
        order(score desc, publishedAt desc)[0...$limit] {
          _id,
          title,
          slug,
          mainImage {
            asset->{
              url
            },
            alt
          },
          shortDescription,
          publishedAt,
          tags[]->{
            _id,
            name,
            slug
          },
          categories[]->{
            _id,
            title
          }
        }`,
			{
				postId,
				excludedPosts: exclude,
				tags,
				categories,
				limit,
			},
		);

		return NextResponse.json(relatedPosts);
	} catch (error) {
		console.error("Error fetching related posts:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
