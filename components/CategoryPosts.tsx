import { Category, Post } from "@/types";
import Image from "next/image";
import ClientSideRoute from "@/components/ClientSideRoute";
import AuthorDate from "./AuthorDate";

interface CategoryPostsProps {
	category: Category;
}

const CategoryPosts = ({ category }: CategoryPostsProps) => {
	const { title, posts, slug } = category;

	if (!posts || posts.length === 0) return null;

	// Function to render the first post layout
	const renderFirstPost = (post: Post) => (
		<ClientSideRoute
			key={post._id}
			href={`/post/${post.slug.current}`}>
			<div className='p-4 rounded-md group '>
				<div className='relative w-full h-64 bg-gray-300 rounded-lg overflow-hidden'>
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
								"Post Image"
							}
							layout='fill'
							objectFit='cover'
							className='group-hover:opacity-75'
						/>
					)}
				</div>
				<div className='mt-4'>
					<h3 className='text-2xl font-semibold group-hover:underline'>
						{post.title}
					</h3>
					<p className='text-sm text-sec mt-2 line-clamp-3'>
						{post.shortDescription || ""}
					</p>
					<AuthorDate
						author={post.author}
						publishedAt={post.publishedAt}
					/>
				</div>
			</div>
		</ClientSideRoute>
	);

	// Function to render layout for all other posts
	const renderOtherPost = (post: Post) => (
		<ClientSideRoute
			key={post._id}
			href={`/post/${post.slug.current}`}>
			<div className='p-2 bg-white rounded-md shadow-md group'>
				<div className='relative w-full h-48 bg-gray-200 rounded-md overflow-hidden'>
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
								"Post Image"
							}
							layout='fill'
							objectFit='cover'
							className='group-hover:opacity-75'
						/>
					)}
				</div>
				<h3 className='mt-2 text-lg font-semibold group-hover:underline'>
					{post.title}
				</h3>
				<AuthorDate
					author={post.author}
					publishedAt={post.publishedAt}
				/>
			</div>
		</ClientSideRoute>
	);

	return (
		<main className='category-section mb-8 font-poppins border rounded-lg'>
			<h2 className='text-xl font-bold mb-4'>
				<ClientSideRoute
					href={`/category/${slug.current}`}>
					<button className='uppercase font-josefin'>
						{title}
					</button>
				</ClientSideRoute>
			</h2>

			<div className='flex gap-4'>
				{/* First post */}
				<div className='w-full md:w-1/2'>
					{renderFirstPost(posts[0])}
				</div>

				{/* Other posts */}
				<div className='w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4'>
					{posts
						.slice(1)
						.map((post: Post) =>
							renderOtherPost(post),
						)}
				</div>
			</div>
		</main>
	);
};

export default CategoryPosts;
