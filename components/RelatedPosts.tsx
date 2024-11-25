import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

interface RelatedPostsProps {
	categories: string[]; // Array of category IDs
	currentPostId: string; // ID of the current post
}

const RelatedPosts = async ({
	categories,
	currentPostId,
}: RelatedPostsProps) => {
	const relatedPosts = await client.fetch(
		`*[_type == "post" && references($categories) && _id != $currentPostId] | order(publishedAt desc) [0...4]{
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
    }`,
		{ categories, currentPostId },
	);

	if (!relatedPosts.length) {
		return <p>No related posts found.</p>;
	}

	return (
		<div>
			<h2 className='text-2xl font-bold mb-4'>
				Related Posts
			</h2>
			<ul className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{relatedPosts.map((post) => (
					<li
						key={post._id}
						className='bg-gray-100 p-4 rounded-lg shadow-md'>
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
								className='w-full h-48 object-cover rounded-md mb-4'
								width={300}
								height={300}
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
							).toDateString()}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RelatedPosts;
