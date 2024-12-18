import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export const getHomepageCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) [0...5] {
      _id,
      title,
      slug,
      author->{
				name,
				slug
				},
      mainImage{
        asset->{
          url
        },
        alt
      },
      publishedAt,
      shortDescription,
      categories[]->{
        title, 
        "slug": slug.current
      }
    }
  }
`;

export async function fetchTrendingPosts() {
	const trendingPosts = await client.fetch(
		`*[_type == "post"] | order(views desc)[0...5] {
      _id, title, slug, views, mainImage { asset-> { url }, alt }
    }`,
	);
	return trendingPosts;
}
