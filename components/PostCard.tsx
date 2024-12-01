import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const PostCard = ({ post }: { post: Post }) => (
	<div className='p-4 border rounded-lg shadow'>
		{post.mainImage?.asset?.url && (
			<Image
				src={post.mainImage.asset.url}
				alt={post.mainImage.alt || "Post image"}
				className='object-cover w-full h-48 rounded-lg'
				width={300}
				height={200}
			/>
		)}
		<h3 className='mt-2 text-lg font-semibold'>{post.title}</h3>
		<p className='mt-1 text-sm text-gray-500'>
			{new Date(post.publishedAt).toDateString()}
		</p>
		<p className='mt-2 text-gray-700'>{post.shortDescription}</p>
		<Link
			href={`/post/${post.slug.current}`}
			className='mt-4 text-blue-600 hover:underline'>
			Read More
		</Link>
	</div>
);
