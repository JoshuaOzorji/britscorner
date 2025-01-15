import Image from "next/legacy/image";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import { defineQuery } from "next-sanity";
import { MdPlayArrow } from "react-icons/md";
import ClientSideRoute from "../ClientSideRoute";
import CategoryLinks from "../CategoryLinks";
import AuthorDate from "../AuthorDate";

const options = { next: { revalidate: 60 } };
const latestPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc)[0...4]{
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
		return <p>No post(s) available</p>;
	}

	return (
		<div className='px-4 py-1 border-t md:border-t-0 md:border-l font-poppins'>
			<h2 className='text-sm font-bold font-josefin'>
				LATEST POSTS
			</h2>
			{latestPosts.map((post, index) => (
				<div
					key={
						post.slug?.current ||
						`fallback-${post._id}`
					}
					className={`flex group ${
						index === 0
							? "flex-col"
							: "flex-row items-center"
					} gap-2 pb-2 mb-2 ${
						index !== latestPosts.length - 1
							? "border-b"
							: ""
					}`}>
					{post.mainImage?.asset?.url && (
						<div
							className={`relative ${
								index === 0
									? "h-[18vh] w-full"
									: "h-[18vh] w-[12rem]"
							}`}>
							<Image
								src={
									post
										.mainImage
										.asset
										.url
								}
								alt={
									post
										.mainImage
										.alt ||
									"Post image"
								}
								layout='fill'
								objectFit='cover'
								className='rounded-lg group-hover:opacity-75'
							/>
						</div>
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

						<ClientSideRoute
							href={`/post/${post.slug?.current}`}>
							<h2 className='post-title-home'>
								{post.title}
							</h2>
						</ClientSideRoute>

						<AuthorDate
							author={post.author}
							publishedAt={
								post.publishedAt
							}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default HeroRight;
