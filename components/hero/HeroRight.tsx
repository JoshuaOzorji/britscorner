import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import { defineQuery } from "next-sanity";
import { MdPlayArrow } from "react-icons/md";
import ClientSideRoute from "../ClientSideRoute";
import CategoryLinks from "../CategoryLinks";
import AuthorDate from "../AuthorDate";

const options = { next: { revalidate: 60 } };
const latestPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc)[0...3]{
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
		categories[]->{
      title,
			"slug": slug.current
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
		<div className='px-4 py-1 border-t md:border-t-0 md:border-l font-poppins'>
			<h2 className='font-bold font-josefin text-sm'>
				LATEST POSTS
			</h2>
			{latestPosts.map((post, index) => (
				<ClientSideRoute
					key={post._id}
					href={`/post/${post.slug?.current}`}
					className={`flex group ${
						index === 0
							? "flex-col"
							: "flex-row items-start"
					} gap-2 pb-2 mb-2 ${index !== latestPosts.length - 1 ? "border-b" : ""}`}>
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
							width={
								index === 0
									? 500
									: 100
							}
							height={
								index === 0
									? 300
									: 150
							}
							className={`group-hover:opacity-75 ${
								index === 0
									? "h-[15vh] lg:h-[20vh] w-full"
									: "h-[20vh] w-[100px]"
							} object-cover object-center rounded-lg`}
						/>
					)}

					<div className='py-1'>
						<div className='flex items-center gap-1'>
							<MdPlayArrow className='w-3 h-3' />

							<CategoryLinks
								categories={
									post.categories
								}
							/>
						</div>

						<h2 className='text-base font-bold capitalize tracking-tight leading-[20px] my-2 md:my-1 group-hover:underline'>
							{post.title}
						</h2>
						<AuthorDate
							author={post.author}
							publishedAt={
								post.publishedAt
							}
						/>
					</div>
				</ClientSideRoute>
			))}
		</div>
	);
};

export default HeroRight;
