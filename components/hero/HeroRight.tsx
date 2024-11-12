import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import { defineQuery } from "next-sanity";

const options = { next: { revalidate: 60 } };
const latestPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc)[0...5]{
    title,
    slug,
    author->{
      name
    },
    mainImage{
      asset->{
        url
      },
      alt
    },
		categories[]->{
      title
    },
    publishedAt,
    body
  }
`);

const HeroRight = async () => {
	const latestPosts: Post[] = await client.fetch(
		latestPostsQuery,
		{},
		options,
	);

	if (!Array.isArray(latestPosts) || latestPosts.length === 0) {
		return <p>No featured post(s) available</p>;
	}

	return (
		<div>
			{latestPosts.map((post) => (
				<div key={post.slug?.current}>
					<h2>{post.title}</h2>
					<p>By {post.author?.name}</p>
					{post.mainImage?.asset?.url && (
						<Image
							src={
								post.mainImage
									.asset
									.url
							}
							alt={
								post.mainImage
									.alt ||
								"Post image"
							}
							width={500}
							height={300}
						/>
					)}

					<div>
						{post.categories.map(
							(category) => (
								<span
									key={
										category.title
									}>
									{
										category.title
									}
								</span>
							),
						)}
					</div>
					<p>
						{new Date(
							post.publishedAt,
						).toDateString()}
					</p>
				</div>
			))}
		</div>
	);
};

export default HeroRight;
