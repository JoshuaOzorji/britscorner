import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { customSerializers } from "@/lib/customSerializers";

interface PostPageProps {
	params: { slug: string };
}

const PostPage = async ({ params }: PostPageProps) => {
	const post: Post | null = await client.fetch(
		`*[_type == "post" && slug.current == $slug][0]{
      title,
      slug,
      author->{
        name
      },
      mainImage{
        asset->{
          url
        },
        alt
      },
      categories[]->{
        title
      },
      publishedAt,
      shortDescription,
      body
    }`,
		{ slug: params.slug },
	);

	// If no post is found, show a message
	if (!post) {
		return <p>Post not found</p>;
	}

	return (
		<article className='prose'>
			{/* Post Image */}
			{post.mainImage?.asset?.url && (
				<Image
					src={post.mainImage.asset.url}
					alt={post.mainImage.alt || "Post image"}
					className='w-full rounded-lg object-cover object-center md:h-[70vh]'
					width={800}
					height={400}
				/>
			)}

			<section className='w-full md:w-[65%]'>
				{/* Post Title */}
				<h1 className='mt-4 text-4xl font-extrabold font-poppins'>
					{post.title}
				</h1>

				{/* Post Author */}
				<p className='mt-2 text-lg text-gray-600'>
					by {post.author?.name}
				</p>

				{/* Post Published Date */}
				<p className='mt-2 text-sm text-gray-500'>
					Published on{" "}
					{new Date(
						post.publishedAt,
					).toDateString()}
				</p>

				{/* Post Categories */}
				<div className='flex gap-2 mt-4'>
					{post.categories.map((category) => (
						<span
							key={category.title}
							className='px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-full font-'>
							{category.title}
						</span>
					))}
				</div>

				{/* Post Description */}
				<p className='mt-4 font-bold text-gray-700 font-inconsolata'>
					{post.shortDescription}
				</p>

				{/* Post Body */}
				<div className='mt-6 font-poppins'>
					{post.body && (
						<PortableText
							value={post.body}
							components={
								customSerializers
							}
						/>
					)}
				</div>
			</section>
		</article>
	);
};

export default PostPage;
