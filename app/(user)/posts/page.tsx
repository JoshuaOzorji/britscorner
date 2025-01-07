import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import { PostCard } from "@/components/PostCard";
import Link from "next/link";

const POSTS_PER_PAGE = 10;

const PostsPage = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) => {
	const page = Number(searchParams?.page) || 1;
	const start = (page - 1) * POSTS_PER_PAGE;

	// Get total posts count
	const totalPosts = await client.fetch(`count(*[_type == "post"])`);

	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

	// Fetch paginated posts
	const posts: Post[] | null = await client.fetch(
		`*[_type == "post"] | order(publishedAt desc) [$start...$end]{
      _id,
      title,
      "slug": slug.current,
      author->{
        name,
        "slug": slug.current
      },
      mainImage{
        asset->{
          url
        },
        alt
      },
      publishedAt,
      shortDescription,
      categories[]->{
        title,
        "slug": slug.current
      }
    }`,
		{ start, end: start + POSTS_PER_PAGE },
	);

	if (!posts) {
		return <p>No posts found</p>;
	}

	return (
		<main className='page-padding'>
			<div className='py-4 border-b'>
				<h1 className='text-3xl font-bold'>
					All Posts
				</h1>
				<span className='flex items-center gap-2 py-2 text-sec'>
					<h4 className='text-xl font-josefin'>
						{totalPosts} posts
					</h4>
				</span>
			</div>

			<div className='mt-8'>
				<div className='postcard-container'>
					{posts.map((post: Post) => (
						<PostCard
							key={post._id}
							post={post}
						/>
					))}
				</div>
			</div>

			{totalPages > 1 && (
				<div className='flex justify-center gap-4 mt-8'>
					{page > 1 && (
						<Link
							href={`/posts?page=${page - 1}`}
							className='px-4 py-2 border rounded hover:bg-gray-100'>
							Previous
						</Link>
					)}

					{Array.from(
						{ length: totalPages },
						(_, i) => i + 1,
					).map((pageNum) => (
						<Link
							key={pageNum}
							href={`/posts?page=${pageNum}`}
							className={`px-4 py-2 border rounded ${
								pageNum === page
									? "bg-blue-500 text-white"
									: "hover:bg-gray-100"
							}`}>
							{pageNum}
						</Link>
					))}

					{page < totalPages && (
						<Link
							href={`/posts?page=${page + 1}`}
							className='px-4 py-2 border rounded hover:bg-gray-100'>
							Next
						</Link>
					)}
				</div>
			)}
		</main>
	);
};

export default PostsPage;
