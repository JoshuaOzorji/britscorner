import { client } from "@/sanity/lib/client";
import { Post, Tag } from "@/types";
import Image from "next/image";
import Link from "next/link";
import BreadCrumb from "@/components/BreadCrumb";

interface TagPageProps {
	params: { slug: string };
}

const TagPage = async ({ params }: TagPageProps) => {
	// Fetch tag data and related posts
	const tag: Tag = await client.fetch(
		`
    *[_type == "tag" && slug.current == $slug][0]{
      name,
      description,
      "posts": *[_type == "post" && references(^._id)]{
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
        shortDescription
      }
    }
    `,
		{ slug: params.slug },
	);

	if (!tag) {
		return <p>Tag not found</p>;
	}

	return (
		<main className='container px-4 py-8 mx-auto'>
			<BreadCrumb
				categories={[
					{
						title: tag.name,
						slug: params.slug,
					},
				]}
			/>
			{/* Tag Information */}
			<div className='mb-8'>
				<h1 className='text-3xl font-bold'>
					{tag.name}
				</h1>
				{tag.description && (
					<p className='mt-4 text-lg text-gray-700'>
						{tag.description}
					</p>
				)}
			</div>

			<div className='mt-8'>
				<h2 className='mb-4 text-xl font-bold'>
					Posts tagged with {tag.name}
				</h2>
				<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{tag.posts.map((post: Post) => (
						<div
							key={post._id}
							className='p-4 border rounded-lg shadow'>
							{post.mainImage?.asset
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
										"Post image"
									}
									className='object-cover w-full h-48 rounded-lg'
									width={
										300
									}
									height={
										200
									}
								/>
							)}
							<h3 className='mt-2 text-lg font-semibold'>
								{post.title}
							</h3>
							<p className='mt-1 text-sm text-gray-500'>
								{new Date(
									post.publishedAt,
								).toDateString()}
							</p>
							<p className='mt-2 text-gray-700'>
								{
									post.shortDescription
								}
							</p>
							<Link
								href={`/post/${post.slug}`}
								className='mt-4 text-blue-600 hover:underline'>
								Read More
							</Link>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default TagPage;
