import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import { defineQuery } from "next-sanity";
import urlFor from "@/sanity/lib/urlFor";

const options = { next: { revalidate: 60 } };
const featuredPostsQuery = defineQuery(`
  *[_type == "post" && "Featured" in categories[]->title]{
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

const HeroLeft = async () => {
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
					className={`flex flex-col ${index === 0 ? "first-item-class" : "other-item-class"} ${index !== featuredPosts.length - 1 ? "border-b border-gray-300 pb-4 mb-4" : ""}`}>
					{/* Render image only for the first item */}
					{index === 0 &&
						post.mainImage?.asset?.url && (
							<Image
								src={urlFor(
									post.mainImage,
								).url()}
								alt={
									post
										.mainImage
										.alt ||
									"Post image"
								}
								className='h-[28vh] sm:h-[26vh] md:h-[30vh] object-cover object-center rounded-lg'
								width={300}
								height={300}
							/>
						)}
					<div>
						<div>
							{post.categories.map(
								(category) => (
									<span
										key={
											category.title
										}
										className='uppercase text-xs font-bold'>
										{
											category.title
										}
									</span>
								),
							)}
						</div>

						<h2 className='text-xl font-bold capitalize'>
							{post.title}
						</h2>
						<div className='text-sm'>
							<p>
								by{" "}
								<span className='underline'>
									{
										post
											.author
											?.name
									}
								</span>
							</p>

							<p>
								{new Date(
									post.publishedAt,
								).toDateString()}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default HeroLeft;
