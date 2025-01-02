import { Category, Post } from "@/types";
import Image from "next/image";
import ClientSideRoute from "@/components/ClientSideRoute";
import AuthorDate from "./AuthorDate";
import { MdPlayArrow } from "react-icons/md";
import CategoryLinks from "./CategoryLinks";

interface CategoryPostsProps {
	category: Category;
}

const CategoryPosts = ({ category }: CategoryPostsProps) => {
	const { title, posts, slug } = category;

	if (!posts || posts.length === 0) return null;

	// Function to render the first post layout
	const renderFirstPost = (post: Post) => (
		<div key={post._id}>
			<div className='p-2 border-b rounded-lg rounded-b group shadow-inherit'>
				<div className='relative w-full h-[30vh] md:h-[40vh] overflow-hidden rounded-lg'>
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
							width={500}
							height={300}
							className='object-cover object-center w-full rounded-lg group-hover:opacity-75'
						/>
					)}
				</div>

				<div className='flex items-center gap-1 md:p-1'>
					<MdPlayArrow className='w-3 h-3' />
					<CategoryLinks
						categories={post.categories}
					/>
				</div>

				<div className='mt-1'>
					<ClientSideRoute
						href={`/post/${post.slug?.current}`}>
						<h3 className='text-base font-bold leading-5 md:text-3xl group-hover:underline'>
							{post.title}
						</h3>
					</ClientSideRoute>

					<p className='my-1 mt-2 text-sm text-sec line-clamp-3'>
						{post.shortDescription || ""}
					</p>
					<AuthorDate
						author={post.author}
						publishedAt={post.publishedAt}
					/>
				</div>
			</div>
		</div>
	);

	// Function to render layout for all other posts
	const renderOtherPost = (post: Post) => (
		<div key={post._id}>
			<div className='p-2 bg-white border-b rounded-lg rounded-b group shadow-inherit'>
				<div className='relative w-full hidden md:block h-[17vh] overflow-hidden rounded-md'>
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
							className='object-cover w-full group-hover:opacity-75'
						/>
					)}
				</div>

				<div className='flex items-center gap-1 md:p-1'>
					<MdPlayArrow className='w-3 h-3' />
					<CategoryLinks
						categories={post.categories}
					/>
				</div>

				<ClientSideRoute
					href={`/post/${post.slug?.current}`}>
					<h2 className='post-title-home'>
						{post.title}
					</h2>
				</ClientSideRoute>

				<AuthorDate
					author={post.author}
					publishedAt={post.publishedAt}
				/>
			</div>
		</div>
	);

	return (
		<main className='p-2 mb-8 border rounded-lg category-section font-poppins'>
			<h2 className='text-xl font-bold'>
				<ClientSideRoute href={`/category/${slug}`}>
					<button className='px-4 mt-2 uppercase font-josefin text-pry'>
						{title}
					</button>
				</ClientSideRoute>
			</h2>

			<div className='flex flex-col gap-4 md:flex-row'>
				{/* First post */}
				<div className='w-full md:w-1/2 bg-white'>
					{renderFirstPost(posts[0])}
				</div>

				{/* Other posts */}
				<div className='flex flex-col w-full gap-4 md:grid md:w-1/2 sm:grid-cols-2'>
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
