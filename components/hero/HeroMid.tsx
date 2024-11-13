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
		<div className='font-poppins'>
			{featuredPosts.map((post, index) => (
				<div
					key={post.slug?.current}
					className={`border-b pb-2 gap-2 ${
						index === 0
							? "flex flex-col items-center text-center"
							: "flex "
					}`}>
					{index === 0 &&
						post.mainImage?.asset?.url && (
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
								width={500}
								height={300}
								className='w-full object-cover object-center rounded-lg'
							/>
						)}

					<section
						className={` ${
							index === 0
								? "flex flex-col items-center"
								: "text-left"
						}`}>
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
											<span className='flex'>
												{
													category.title
												}
											</span>
										</span>
									),
								)}
							</div>
						</div>

						<div className='my-1 space-y-1'>
							<h2
								className={`font-bold ${
									index ===
									0
										? "text-3xl"
										: "text-base"
								}`}>
								{post.title}
							</h2>
							<p className='text-sm font-gothic'>
								{
									post?.shortDescription
								}
							</p>
						</div>

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
			))}
		</div>
	);
};

export default HeroMid;
