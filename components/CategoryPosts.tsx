import { Category, Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface CategoryPostsProps {
	category: Category;
}

const CategoryPosts = ({ category }: CategoryPostsProps) => {
	const { title, posts, slug } = category;
	return (
		<main className='category-section mb-8'>
			<h2 className='text-xl font-bold mb-4'>
				<Link href={`/category/${slug.current}`}>
					<a className='hover:underline'>
						{title}
					</a>
				</Link>
			</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{posts.map((post: Post) => (
					<Link
						key={post._id}
						href={`/post/${post.slug.current}`}>
						<a className='group block'>
							<div className='relative w-full h-48 bg-gray-200'>
								{post.mainImage
									?.asset
									?.url && (
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
										layout='fill'
										objectFit='cover'
										className='rounded-md group-hover:opacity-75'
									/>
								)}
							</div>
							<h3 className='mt-2 text-lg font-semibold group-hover:underline'>
								{post.title}
							</h3>
							<p className='text-sm text-gray-500'>
								{post.shortDescription ||
									"No description available"}
							</p>
							<p className='text-xs text-gray-400'>
								{new Date(
									post.publishedAt,
								).toLocaleDateString()}
							</p>
						</a>
					</Link>
				))}
			</div>
		</main>
	);
};

export default CategoryPosts;
