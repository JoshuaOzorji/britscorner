import Link from "next/link";
import { defineQuery } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { formatDate } from "@/sanity/lib/formatDate";

const options = { next: { revalidate: 60 } };

const POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
]{_id, title, slug, publishedAt, body,  "categories": categories[]->title}|order(publishedAt desc)`);

interface Post {
	_id: string;
	title: string;
	slug: { current: string };
	publishedAt: string;
	categories: string[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	body: any[];
}

export default async function IndexPage() {
	const posts: Post[] = await client.fetch(POSTS_QUERY, {}, options);

	console.log(posts);

	return (
		<main className='flex bg-gray-100 min-h-screen flex-col p-24 gap-12'>
			<h1 className='text-4xl font-bold tracking-tighter'>
				All Posts
			</h1>
			<ul className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
				{posts.map((post) => (
					<li
						className='bg-white p-4 rounded-lg'
						key={post._id}>
						<Link
							className='hover:underline'
							href={`/post/${post?.slug?.current}`}>
							<h2 className='text-xl font-semibold'>
								{post?.title}
							</h2>

							<h2>
								{post.categories.join(
									", ",
								)}
							</h2>
							<PortableText
								value={
									post.body
								}
							/>

							{post?.publishedAt && (
								<p className='text-gray-500'>
									{formatDate(
										post.publishedAt,
									)}
								</p>
							)}
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
