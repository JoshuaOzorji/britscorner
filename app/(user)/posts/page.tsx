import { PostCard } from "@/components/PostCard";
import { Post } from "@/types";
import { client } from "@/sanity/lib/client";

const fetchPosts = async (): Promise<Post[]> => {
	const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    author->{
      name,
      slug
    },
    mainImage{
      asset->{
        url
      },
      alt
    },
    categories[]->{
      title,
      slug
    },
    publishedAt,
    views
  } | order(publishedAt desc)`;

	return await client.fetch(query);
};

const page = async () => {
	const posts = await fetchPosts();

	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
			{posts.map((post) => (
				<PostCard key={post._id} post={post} />
			))}
		</div>
	);
};

export default page;
