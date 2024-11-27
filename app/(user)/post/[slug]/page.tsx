import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { customSerializers } from "@/lib/customSerializers";
import Link from "next/link";
import RelatedPosts from "@/components/RelatedPosts";
import ShareLink from "@/components/ShareLink";

interface PostPageProps {
	params: { slug: string };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const PostPage = async ({ params }: PostPageProps) => {
	const post: Post | null = await client.fetch(
		`*[_type == "post" && slug.current == $slug][0]{
				_id,
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
					_id, 
					title
				},
				tags[]->{
					name
				},
				publishedAt,
				shortDescription,
				body
			}`,
		{ slug: params.slug },
	);

	// If no post is found, show a message
	if (!post) {
		return <p>Post not found</p>;
	}

	const categoryIds = post.categories.map((category) => category._id);

	return (
		<main>
			<article className='prose'>
				{/* Post Image */}
				{post.mainImage?.asset?.url && (
					<Image
						src={post.mainImage.asset.url}
						alt={
							post.mainImage.alt ||
							"Post image"
						}
						className='w-full rounded-lg object-cover object-center md:h-[70vh]'
						width={800}
						height={400}
					/>
				)}

				<section className='w-full md:w-[65%]'>
					{/* Post Title */}
					<h1 className='mt-4 text-4xl font-extrabold font-poppins'>
						{post.title}
					</h1>
					<p className='mt-2 text-lg text-gray-600'>
						by{" "}
						{post.author?.name &&
							post.author?.slug
								?.current && (
								<Link
									href={`/author/${post.author.slug.current}`}
									className='text-blue-600 hover:underline'>
									{
										post
											.author
											.name
									}
								</Link>
							)}
					</p>

					{/* Post Published Date */}
					<p className='mt-2 text-sm text-gray-500'>
						Published on{" "}
						{new Date(
							post.publishedAt,
						).toDateString()}
					</p>

					{/* Post Categories */}
					<div className='flex gap-2 mt-4'>
						{post.categories.map(
							(category) => (
								<span
									key={
										category.title
									}
									className='px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-full font-'>
									{
										category.title
									}
								</span>
							),
						)}
					</div>

					{/* Post Description */}
					<p className='mt-4 font-bold text-gray-700 font-inconsolata'>
						{post.shortDescription}
					</p>

					{/* Post Body */}
					<div className='mt-6 font-poppins'>
						{post.body && (
							<PortableText
								value={
									post.body
								}
								components={
									customSerializers
								}
							/>
						)}
					</div>

					{/* Post Tags */}
					{post.tags && post.tags.length > 0 && (
						<div className='flex flex-wrap gap-2 mt-10'>
							{post.tags.map(
								(tag) => (
									<span
										key={
											tag.name
										}
										className='px-3 py-1 text-sm text-white rounded-full bg-slate-700'>
										{
											tag.name
										}
									</span>
								),
							)}
						</div>
					)}
				</section>
			</article>

			<aside>
				<RelatedPosts
					tags={
						post.tags
							? post.tags.map(
									(tag) =>
										tag.name,
								)
							: []
					}
					categories={categoryIds}
					currentPostId={post._id}
				/>
			</aside>

			<div>
				<ShareLink
					postUrl={`${baseUrl}/post/${post.slug.current}`}
					postTitle={post.title}
				/>
			</div>
		</main>
	);
};

export default PostPage;
