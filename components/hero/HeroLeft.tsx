import { GetStaticProps } from "next";
import { client } from "../../sanity/lib/client";
import Image from "next/image";
import { Post } from "@/types";
import { defineQuery } from "next-sanity";

const featuredPostsQuery =
	defineQuery(`*[_type == "post" && "Featured" in categories[]->title]{
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
	publishedAt,
	body
}
`);

// export const getStaticProps: GetStaticProps = async () => {
// 	const featuredPosts = await client.fetch(
// 		featuredPostsQuery,
// 		{},
// 		options,
// 	);

// 	return {
// 		props: { featuredPosts },
// 	};
// };

export const getStaticProps: GetStaticProps = async () => {
	const featuredPosts = await client.fetch(featuredPostsQuery);
	return {
		props: { featuredPosts },
	};
};

const HeroLeft = ({ featuredPosts }: { featuredPosts: Post[] }) => {
	if (!Array.isArray(featuredPosts) || featuredPosts.length === 0) {
		return <p>No featured posts available</p>;
	}

	console.log("Fetched Featured Posts:", featuredPosts);

	return (
		<div>
			{featuredPosts.map((post) => (
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

export default HeroLeft;
