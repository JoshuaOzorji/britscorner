"use client";

import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";

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

				const query = `
          *[_type == "post" && _id != $currentPostId && 
            (count(tags[]->name in $tags) > 0 || references($categories))] 
          | order(publishedAt desc) [0...4]{
            _id,
        		title,
        		"slug": slug.current,
            mainImage{
              asset->{
                url
              },
              alt
            },
            publishedAt,
						author->{
							name,
							"slug": slug.current
						},
					categories[]->{title,	"slug": slug.current},
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
			<h2 className='mb-4 text-2xl font-bold text-black font-poppins'>
				Related Posts
			</h2>
			<ul className='flex flex-wrap gap-6 sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
				{relatedPosts.map((post) => (
					<li key={post._id}>
						<PostCard post={post} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default RelatedPosts;
