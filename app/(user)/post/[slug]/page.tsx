import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import Image from "next/legacy/image";
import { PortableText } from "@portabletext/react";
import { customSerializers } from "@/lib/customSerializers";
import Link from "next/link";
import RelatedPosts from "@/components/RelatedPosts";
import ShareLink from "@/components/ShareLink";
import BreadCrumb from "@/components/BreadCrumb";

type Props = {
	params: Promise<{ slug: string }>;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const PostPage = async ({ params }: Props) => {
	const { slug } = await params;

	const post: Post | null = await client.fetch(
		`*[_type == "post" && slug.current == $slug][0]{
				_id,
				title,
				slug,
				views,
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
				name,
				"slug": slug.current
				},
				publishedAt,
				shortDescription,
				body
			}`,
		{ slug },
	);

	// If no post is found, show a message
	if (!post) {
		return <p>Post not found</p>;
	}

	const categoryIds = post.categories.map((category) => category._id);

	return (
		<>
			<main className='text-sec'>
				<BreadCrumb
					categories={post.categories.map(
						(category) => ({
							title: category.title,
							slug: category.slug,
						}),
					)}
					postTitle={post.title}
				/>
				<article className='prose'>
					<div className='my-5'>
						{/* Post Categories */}
						<div className='flex justify-center gap-2 my-4 font-bold font-inconsolata'>
							{post.categories.map(
								(category) => (
									<Link
										key={
											category.title
										}
										href={`/category/${category.slug}`}>
										<span className='px-3 py-1 text-xs border rounded-full md:text-sm bg-pry animate text-acc hover:bg-acc hover:text-sec hover:border-sec'>
											{
												category.title
											}
										</span>
									</Link>
								),
							)}
						</div>

						<h1 className='py-2 text-3xl font-extrabold text-left text-gray-800 capitalize md:text-center md:text-5xl font-poppins'>
							{post.title}
						</h1>

						<div
							className={`text-sm text-gray-700 font-josefin mx-auto md:w-[60%] p-2 my-3 ${
								post.shortDescription &&
								post
									.shortDescription
									.length >
									0
									? "border border-pry"
									: ""
							}`}>
							{post.shortDescription &&
							post.shortDescription
								.length > 0 ? (
								<ul className='pl-5 space-y-2 list-disc'>
									{post.shortDescription.map(
										(
											item,
											index,
										) => (
											<li
												key={
													index
												}>
												{
													item
												}
											</li>
										),
									)}
								</ul>
							) : (
								<p></p>
							)}
						</div>

						<div className='justify-center hidden md:flex'>
							<ShareLink
								postUrl={`${baseUrl}/post/${post.slug.current}`}
								postTitle={
									post.title
								}
							/>
						</div>

						<div className='my-2 text-[14px] md:text-base font-josefin space-y-1'>
							<p>
								By{" "}
								{post.author
									?.name &&
									post
										.author
										?.slug
										?.current && (
										<Link
											href={`/author/${post.author.slug.current}`}>
											<span className='text-pry hover:underline'>
												{
													post
														.author
														.name
												}
											</span>
										</Link>
									)}
							</p>

							{/* Post Published Date */}
							<p>
								Updated On:{" "}
								<span className='text-pry'>
									{new Date(
										post.publishedAt,
									).toDateString()}
								</span>
							</p>
						</div>
					</div>

					<div className='relative h-[30vh] md:h-[63vh] w-full md:w-[86%] mx-auto'>
						{post.mainImage?.asset?.url && (
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
								className='rounded-lg '
								layout='fill'
								objectFit='cover'
								objectPosition='center'
							/>
						)}
					</div>

					<section className='w-full mx-auto md:w-[60%]'>
						{/* Post Body */}
						<div className='px-1 mt-6 md:px-0 font-poppins'>
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
						{post.tags &&
							post.tags.length >
								0 && (
								<div className='flex flex-wrap items-center gap-2 mt-10 font-josefin'>
									<span className='font-bold'>
										TAGS:
									</span>
									{post.tags.map(
										(
											tag,
										) => (
											<span
												key={
													tag.name
												}>
												{tag.slug ? (
													<Link
														href={`/tag/${tag.slug}`}>
														<span className='text-base underline capitalize text-pry hover:text-sec decoration-inherit'>
															{
																tag.name
															}
														</span>
													</Link>
												) : (
													<span className='text-base capitalize text-pry'>
														{
															tag.name
														}
													</span>
												)}
											</span>
										),
									)}
								</div>
							)}
					</section>

					<div className='flex justify-center my-8 border-y'>
						<ShareLink
							postUrl={`${baseUrl}/post/${post.slug.current}`}
							postTitle={post.title}
						/>
					</div>
				</article>

				<aside>
					<RelatedPosts
						tags={
							post.tags
								? post.tags.map(
										(
											tag,
										) =>
											tag.name,
									)
								: []
						}
						categories={categoryIds}
						currentPostId={post._id}
					/>
				</aside>
			</main>
		</>
	);
};

export default PostPage;
