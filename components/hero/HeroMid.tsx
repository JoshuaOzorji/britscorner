import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import { defineQuery } from "next-sanity";
import { MdPlayArrow } from "react-icons/md";
import ClientSideRoute from "../ClientSideRoute";
import CategoryLinks from "../CategoryLinks";
import AuthorDate from "../AuthorDate";

const options = { next: { revalidate: 60 } };

const featuredPostsQuery = defineQuery(`
  *[_type == "post" && "AI" in categories[]->title] | order(publishedAt desc) [0..2]{
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
    body,
    shortDescription
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
		<div className='flex flex-wrap gap-x-4 font-poppins'>
			{featuredPosts.map((post, index) =>
				index === 0 ? (
					<div
						key={
							post.slug?.current ||
							`fallback-${post._id}`
						}>
						<div className='flex flex-col items-center w-full gap-4 pb-4 border-b group'>
							{post.mainImage?.asset
								?.url && (
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
									width={
										500
									}
									height={
										300
									}
									className='object-cover object-center w-full rounded-lg group-hover:opacity-75'
								/>
							)}
							<section className='flex flex-col items-center gap-1 px-4 text-left md:text-center'>
								<div className='flex items-center gap-1 md:p-1'>
									<MdPlayArrow className='w-3 h-3' />
									{/* <CategoryLinks
										categories={
											post.categories
										}
									/> */}

									<CategoryLinks
										categories={
											post.categories
										}
									/>
								</div>

								<ClientSideRoute
									href={`/post/${post.slug?.current}`}>
									<h2 className='text-base font-bold leading-5 md:text-3xl group-hover:underline'>
										{
											post.title
										}
									</h2>
								</ClientSideRoute>

								<p className='text-[13px] md:text-sm font-poppins'>
									{
										post.shortDescription
									}
								</p>
								{/* <AuthorDate
									author={
										post.author
									}
									publishedAt={
										post.publishedAt
									}
								/> */}

								<AuthorDate
									author={
										post.author
									}
									publishedAt={
										post.publishedAt
									}
								/>
							</section>
						</div>
					</div>
				) : (
					<div
						key={
							post.slug?.current ||
							`fallback-${post._id}`
						}
						className='w-full px-4 my-2 lg:w-auto lg:flex-1 lg:mb-0 lg:px-0 lg:my-0 group'>
						<div className='flex flex-row gap-2 lg:gap-4 lg:my-4'>
							{post.mainImage?.asset
								?.url && (
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
									width={
										200
									}
									height={
										120
									}
									className='object-cover object-center rounded-lg h-[20vh] w-[100px] group-hover:opacity-75'
								/>
							)}
							<div className='flex flex-col py-1 md:gap-'>
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
									<h2 className='text-base font-bold capitalize tracking-tight leading-[20px] my-2 md:my-1 group-hover:underline'>
										{
											post.title
										}
									</h2>
								</ClientSideRoute>

								<AuthorDate
									author={
										post.author
									}
									publishedAt={
										post.publishedAt
									}
								/>
							</div>
						</div>
					</div>
				),
			)}
		</div>
	);
};

export default HeroMid;
