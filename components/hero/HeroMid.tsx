import Image from "next/legacy/image";
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
						<div className='flex flex-col items-center w-full gap-1 border-b pb-3 group'>
							{post.mainImage?.asset
								?.url && (
								<div className='relative w-full h-[40vh] md:h-[50vh]'>
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
										className='rounded-lg group-hover:opacity-75'
										layout='fill'
										objectFit='cover'
										objectPosition='center'
									/>
								</div>
							)}
							<section className='flex flex-col items-center gap-1 px-1 text-left md:text-center'>
								<div className='flex items-center gap-1 md:p-1'>
									<MdPlayArrow className='w-3 h-3' />

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
						className='flex flex-col w-full px-4 my-2 lg:w-auto lg:flex-1 lg:mb-0 lg:px-0 lg:my-0 group md:flex-row'>
						<div className='flex flex-row items-center gap-2 lg:gap-2 lg:my-3'>
							{post.mainImage?.asset
								?.url && (
								<div className='relative h-[20vh] w-[30vh]'>
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
										objectPosition='center'
										className='rounded-lg group-hover:opacity-75'
									/>
								</div>
							)}
							<div className='flex flex-col py-1'>
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
