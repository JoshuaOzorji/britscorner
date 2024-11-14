import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import { defineQuery } from "next-sanity";
import { MdPlayArrow } from "react-icons/md";

const options = { next: { revalidate: 60 } };
const featuredPostsQuery = defineQuery(`
  *[_type == "post" && "AI" in categories[]->title] | order(publishedAt desc) [0..2]{
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
						key={post.slug?.current}
						className='w-full mb-4'>
						<div className='flex flex-col items-center w-full gap-4 pb-4 border-b'>
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
							<section className='flex flex-col items-center gap-1 text-left md:text-center'>
								<div className='flex items-center gap-1 md:p-1'>
									<MdPlayArrow className='w-3 h-3' />
									<div className='flex space-x-1'>
										{post.categories.map(
											(
												category,
											) => (
												<span
													key={
														category.title
													}
													className='uppercase text-[10px] font-bold text-gray-500'>
													{
														category.title
													}
												</span>
											),
										)}
									</div>
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
										{
											post
												.author
												?.name
										}
									</p>
									<p>
										{new Date(
											post.publishedAt,
										).toDateString()}
									</p>
								</div>
							</section>
						</div>
					</div>
				) : (
					<section
						key={post.slug?.current}
						className='flex-1'>
						<div className='flex flex-col'>
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
									className='object-cover object-center w-full rounded-lg h-[20vh]'
								/>
							)}
							<section className='flex flex-col justify-between pt-4'>
								<div className='flex items-center gap-1 p-1'>
									<MdPlayArrow className='w-3 h-3' />
									<div className='flex space-x-1'>
										{post.categories.map(
											(
												category,
											) => (
												<span
													key={
														category.title
													}
													className='uppercase text-[10px] font-bold text-gray-500'>
													{
														category.title
													}
												</span>
											),
										)}
									</div>
								</div>
								<h2 className='my-1 text-base font-bold'>
									{
										post.title
									}
								</h2>
								<p className='text-sm font-gothic'>
									{
										post.shortDescription
									}
								</p>
								<div className='author-date'>
									<p>
										by{" "}
										{
											post
												.author
												?.name
										}
									</p>
									<p>
										{new Date(
											post.publishedAt,
										).toDateString()}
									</p>
								</div>
							</section>
						</div>
					</section>
				),
			)}
		</div>
	);
};

export default HeroMid;
