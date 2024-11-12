import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import { defineQuery } from "next-sanity";

const options = { next: { revalidate: 60 } };
const featuredPostsQuery = defineQuery(`
  *[_type == "post" && "AI" in categories[]->title]{
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

const HeroMid = async () => {
	const featuredPosts: Post[] = await client.fetch(
		featuredPostsQuery,
		{},
		options,
	);

	if (!Array.isArray(featuredPosts) || featuredPosts.length === 0) {
		return <p>No featured post(s) available</p>;
	}

	return (
		<div>
			{featuredPosts.map((post) => (
				<div key={post.slug?.current}>
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

					<h2>{post.title}</h2>
					<p>By {post.author?.name}</p>

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

export default HeroMid;
