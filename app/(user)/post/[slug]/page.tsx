import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { customSerializers } from "@/lib/customSerializers";
import Link from "next/link";
import RelatedPosts from "@/components/RelatedPosts";
import ShareLink from "@/components/ShareLink";
import BreadCrumb from "@/components/BreadCrumb";

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
					title,
					"slug": slug.current
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
			<BreadCrumb
				categories={post.categories.map((category) => ({
					title: category.title,
					slug: category.slug,
				}))}
				postTitle={post.title}
			/>
			<article className='prose'>
				<div className='my-5'>
					{/* Post Categories */}
					<div className='flex justify-center gap-2 mt-4 font-josefin'>
						{post.categories.map(
							(category) => (
								<Link
									key={
										category.title
									}
									href={`/category/${category.slug}`}
									className='px-3 py-1 text-sm border rounded-full bg-pry animate text-acc hover:bg-acc hover:text-sec hover:border-sec'>
									{
										category.title
									}
								</Link>
							),
						)}
					</div>

					<h1 className='mt-4 text-4xl font-extrabold text-center capitalize md:text-5xl font-poppins '>
						{post.title}
					</h1>

					<p className='mt-4 text-sm text-center text-gray-700 font-josefin mx-auto md:w-[60%] border border-pry p-4'>
						{post.shortDescription}
					</p>

					<div className='flex justify-center '>
						<ShareLink
							postUrl={`${baseUrl}/post/${post.slug.current}`}
							postTitle={post.title}
						/>
					</div>

					<div className='text-base font-josefin'>
						<p className='mt-2 text-gray-600 '>
							By{" "}
							{post.author?.name &&
								post.author
									?.slug
									?.current && (
									<Link
										href={`/author/${post.author.slug.current}`}
										className='text-pry hover:underline'>
										{
											post
												.author
												.name
										}
									</Link>
								)}
						</p>

						{/* Post Published Date */}
						<p className='text-sec'>
							Updated On:{" "}
							{new Date(
								post.publishedAt,
							).toDateString()}
						</p>
					</div>
				</div>

				<div>
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
							className='w-full rounded-lg object-cover object-center md:h-[65vh]'
							width={800}
							height={400}
						/>
					)}
				</div>

				<section className='w-full mx-auto md:w-[60%]'>
					{/* Post Title */}

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
						<div className='flex flex-wrap items-center gap-2 mt-10 font-josefin'>
							<p className='px-2 py-[2px] rounded-md bg-sec text-acc'>
								#
							</p>
							{post.tags.map(
								(tag) => (
									<span
										key={
											tag.name
										}
										className='text-base underline text-pry'>
										{
											tag.name
										}
									</span>
								),
							)}
						</div>
					)}

					<div className='flex justify-center '>
						<ShareLink
							postUrl={`${baseUrl}/post/${post.slug.current}`}
							postTitle={post.title}
						/>
					</div>
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
		</main>
	);
};

export default PostPage;
