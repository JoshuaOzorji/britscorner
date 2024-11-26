import { client } from "@/sanity/lib/client";
import { Category } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface CategoryPageProps {
	params: { slug: string };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
	// Fetch category data and related posts
	const category: Category = await client.fetch(
		`
    *[_type == "category" && slug.current == $slug][0]{
        title,
        description,
        "posts": *[_type == "post" && references(^._id)]{
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

	if (!category) {
		return <p>Category not found</p>;
	}

	return (
		<main className='container mx-auto px-4 py-8'>
			{/* Category Information */}
			<div className='mb-8'>
				<h1 className='text-3xl font-bold'>
					{category.title}
				</h1>
				{category.description && (
					<p className='mt-4 text-lg text-gray-700'>
						{category.description}
					</p>
				)}
			</div>

			{/* Category's Posts */}
			<div className='mt-8'>
				<h2 className='text-xl font-bold mb-4'>
					Posts in {category.title}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{category.posts.map((post) => (
						<div
							key={post._id}
							className='border p-4 rounded-lg shadow'>
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
									className='w-full h-48 object-cover rounded-lg'
									width={
										300
									}
									height={
										200
									}
								/>
							)}
							<h3 className='text-lg font-semibold mt-2'>
								{post.title}
							</h3>
							<p className='text-sm text-gray-500 mt-1'>
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

export default CategoryPage;
