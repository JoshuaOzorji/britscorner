import BreadCrumb from "@/components/BreadCrumb";
import { PostCard } from "@/components/PostCard";
import { client } from "@/sanity/lib/client";
import { Category } from "@/types";

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

	if (!category) {
		return <p>Category not found</p>;
	}

	return (
		<main className='container mx-auto px-4 py-8'>
			<BreadCrumb
				categories={[
					{
						title: category.title,
						slug: params.slug,
					},
				]}
			/>
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

export default CategoryPage;
