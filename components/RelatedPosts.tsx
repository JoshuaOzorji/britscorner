"use client";

import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RelatedPostsProps {
	tags: string[];
	categories: string[];
	currentPostId: string;
}

const RelatedPosts = ({
	tags,
	categories,
	currentPostId,
}: RelatedPostsProps) => {
	const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRelatedPosts = async () => {
			try {
				if (!tags.length && !categories.length) {
					setError(
						"No tags or categories provided.",
					);
					return;
				}

				// Combined query to check for posts based on tags or categories
				const query = `
          *[_type == "post" && _id != $currentPostId && 
            (count(tags[]->name in $tags) > 0 || references($categories))] 
          | order(publishedAt desc) [0...4]{
            _id,
            title,
            slug,
            mainImage{
              asset->{
                url
              },
              alt
            },
            publishedAt
          }`;

				const posts = await client.fetch(query, {
					tags,
					categories,
					currentPostId,
				});

				if (posts.length === 0) {
					setError("No related posts found.");
				} else {
					setRelatedPosts(posts);
				}
			} catch (error) {
				console.error(
					"Error fetching related posts:",
					error,
				);
				setError(
					"There was an error loading related posts.",
				);
			}
		};

		fetchRelatedPosts();
	}, [tags, categories, currentPostId]);

	// Error message or loading state handling
	if (error) {
		return <p>{error}</p>;
	}

	if (relatedPosts.length === 0) {
		return <p>No related posts found.</p>;
	}

	return (
		<div className='mt-4'>
			<h2 className='mb-4 text-2xl font-bold'>
				Related Posts
			</h2>
			<ul className='grid grid-cols-1 gap-6 md:grid-cols-2'>
				{relatedPosts.map((post) => (
					<li
						key={post._id}
						className='p-4 bg-gray-100 rounded-lg shadow-md'>
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
									"Post Image"
								}
								className='object-cover w-full h-48 mb-4 rounded-md'
								layout='responsive'
								width={300}
								height={200}
							/>
						)}
						<h3 className='text-lg font-semibold'>
							<Link
								href={`/post/${post.slug.current}`}>
								{post.title}
							</Link>
						</h3>
						<p className='text-sm text-gray-500'>
							Published on{" "}
							{new Date(
								post.publishedAt,
							).toLocaleDateString()}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RelatedPosts;

// import { client } from "@/sanity/lib/client";
// import { Post } from "@/types";
// import Image from "next/image";
// import Link from "next/link";

// interface RelatedPostsProps {
// 	tags: string[];
// 	categories: string[];
// 	currentPostId: string;
// }

// const RelatedPosts = async ({
// 	tags,
// 	categories,
// 	currentPostId,
// }: RelatedPostsProps) => {
// 	let relatedPosts = await client.fetch(
// 		`*[_type == "post" && count(tags[]->name in $tags) > 0 && _id != $currentPostId]
//         | order(publishedAt desc) [0...4]{
// 			_id,
// 			title,
// 			slug,
// 			mainImage{
// 				asset->{
// 					url
// 				},
// 				alt
// 			},
// 			publishedAt
// 		}`,
// 		{ tags, currentPostId },
// 	);

// 	// If no posts are found based on tags, fallback to categories
// 	if (!relatedPosts.length) {
// 		relatedPosts = await client.fetch(
// 			`*[_type == "post" && references($categories) && _id != $currentPostId]
//             | order(publishedAt desc) [0...4]{
// 				_id,
// 				title,
// 				slug,
// 				mainImage{
// 					asset->{
// 						url
// 					},
// 					alt
// 				},
// 				publishedAt
// 			}`,
// 			{ categories, currentPostId },
// 		);
// 	}

// 	if (!relatedPosts.length) {
// 		return <p>No related posts found.</p>;
// 	}

// 	return (
// 		<div>
// 			<h2 className='mb-4 text-2xl font-bold'>
// 				Related Posts
// 			</h2>
// 			<ul className='grid grid-cols-1 gap-6 md:grid-cols-2'>
// 				{relatedPosts.map((post: Post) => (
// 					<li
// 						key={post._id}
// 						className='p-4 bg-gray-100 rounded-lg shadow-md'>
// 						{post.mainImage?.asset?.url && (
// 							<Image
// 								src={
// 									post
// 										.mainImage
// 										.asset
// 										.url
// 								}
// 								alt={
// 									post
// 										.mainImage
// 										.alt ||
// 									"Post Image"
// 								}
// 								className='object-cover w-full h-48 mb-4 rounded-md'
// 								width={300}
// 								height={300}
// 							/>
// 						)}
// 						<h3 className='text-lg font-semibold'>
// 							<Link
// 								href={`/post/${post.slug.current}`}>
// 								{post.title}
// 							</Link>
// 						</h3>
// 						<p className='text-sm text-gray-500'>
// 							Published on{" "}
// 							{new Date(
// 								post.publishedAt,
// 							).toDateString()}
// 						</p>
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// export default RelatedPosts;
