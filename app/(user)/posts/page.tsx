import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import { PostCard } from "@/components/PostCard";

const PostsPage = async () => {
	const posts: Post[] | null = await client.fetch(
		`*[_type == "post"] | order(publishedAt desc){
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
	);

	if (!posts) {
		return <p>Post not found</p>;
	}

	return (
		<main className='page-padding'>
			<div className='py-4 border-b'>
				<h1 className='text-3xl font-bold'>
					All Posts
				</h1>
				<span className='flex items-center gap-2 py-2 text-sec'>
					<h4 className='text-xl font-josefin'>
						{posts.length} posts
					</h4>
				</span>
			</div>

			<div className='mt-8'>
				<div className='flex flex-wrap gap-6 sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
					{posts.map((post: Post) => (
						<PostCard
							key={post._id}
							post={post}
						/>
					))}
				</div>
			</div>
		</main>
	);
};

export default PostsPage;
