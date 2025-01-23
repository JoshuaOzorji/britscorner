import Image from "next/legacy/image";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import { defineQuery } from "next-sanity";
import urlFor from "@/sanity/lib/urlFor";
import { MdPlayArrow } from "react-icons/md";
import ClientSideRoute from "../ClientSideRoute";
import CategoryLinks from "../CategoryLinks";
import AuthorDate from "../AuthorDate";

const options = { next: { revalidate: 60 } };
const featuredPostsQuery = defineQuery(`
  *[_type == "post" && "Featured" in categories[]->title]{
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
		<div className='px-1 md:px-3 py-4 border-t md:border-t-0 md:border-r font-poppins'>
			{featuredPosts.map((post, index) => (
				<div
					key={
						post.slug?.current ||
						`fallback-${post._id}`
					}>
					<div
						className={`flex flex-col group relative ${index === 0 ? "first-item-class" : "other-item-class"} ${index !== featuredPosts.length - 1 ? "border-b mb-2 pb-2" : ""}`}>
						{index === 0 &&
							post.mainImage?.asset
								?.url && (
								<div className='relative h-[20vh] md:h-[18vh] w-full'>
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
										className='object-cover object-center rounded-lg group-hover:opacity-75
									'
										layout='fill'
										objectFit='cover'
										objectPosition='center'
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
								{" "}
								<h2 className='post-title-home'>
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
			))}
		</div>
	);
};

export default HeroLeft;
