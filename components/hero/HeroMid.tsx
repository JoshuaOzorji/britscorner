import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import { defineQuery } from "next-sanity";
import { MdPlayArrow } from "react-icons/md";
import ClientSideRoute from "../ClientSideRoute";
import CategoryLinks from "../CategoryLinks";
import Link from "next/link";

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
					<ClientSideRoute
						className='flex flex-col items-center w-full gap-4 pb-4 border-b'
						href={`/post/${post.slug?.current}`}
						key={post._id}>
						<div className=''>
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
									className='object-cover object-center w-full rounded-lg'
								/>
							)}
							<section className='flex flex-col items-center gap-1 px-4 text-left md:text-center'>
								<div className='flex items-center gap-1 md:p-1'>
									<MdPlayArrow className='w-3 h-3' />
									<CategoryLinks
										categories={
											post.categories
										}
									/>
								</div>
								<h2 className='my-1 text-base font-bold leading-5 md:text-3xl'>
									{
										post.title
									}
								</h2>
								<p className='text-[13px] md:text-sm font-gothic'>
									{
										post.shortDescription
									}
								</p>
								<div className='author-date'>
									<p>
										by{" "}
										{post
											.author
											?.name &&
											post
												.author
												?.slug
												?.current && (
												<Link
													href={`/author/${post.author.slug.current}`}
													className='text-sec underline hover:text-pry'>
													{
														post
															.author
															.name
													}
												</Link>
											)}
									</p>
									<p>
										{new Date(
											post.publishedAt,
										).toDateString()}
									</p>
								</div>
							</section>
						</div>
					</ClientSideRoute>
				) : (
					<ClientSideRoute
						key={post._id}
						href={`/post/${post.slug?.current}`}
						className='w-full px-4 my-2 lg:w-auto lg:flex-1 lg:mb-0 lg:px-0 lg:my-0'>
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
									className='object-cover object-center rounded-lg h-[20vh] w-[100px]'
								/>
							)}
							<section className='flex flex-col py-1 md:gap-'>
								<div className='flex items-center gap-1'>
									<MdPlayArrow className='w-3 h-3' />
									<CategoryLinks
										categories={
											post.categories
										}
									/>
								</div>
								<h2 className='text-base font-bold capitalize tracking-tight leading-[20px] my-2 md:my-1'>
									{
										post.title
									}
								</h2>

								<div className='author-date'>
									<p>
										by{" "}
										{post
											.author
											?.name &&
											post
												.author
												?.slug
												?.current && (
												<Link
													href={`/author/${post.author.slug.current}`}
													className='text-sec underline hover:text-pry'>
													{
														post
															.author
															.name
													}
												</Link>
											)}
									</p>
									<p>
										{new Date(
											post.publishedAt,
										).toDateString()}
									</p>
								</div>
							</section>
						</div>
					</ClientSideRoute>
				),
			)}
		</div>
	);
};

export default HeroMid;
