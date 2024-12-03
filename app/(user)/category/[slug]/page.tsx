import BreadCrumb from "@/components/BreadCrumb";
import { PostCard } from "@/components/PostCard";
import { client } from "@/sanity/lib/client";
import { Category } from "@/types";
import { IoLocationOutline } from "react-icons/io5";
interface CategoryPageProps {
	params: { slug: string };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
	const category: Category = await client.fetch(
		`
		*[_type == "category" && slug.current == $slug][0]{
			title,
			description,
			"posts": *[_type == "post" && references(^._id)]{
				_id,
				title,
				"slug": slug.current,
				author->{name}, 
				mainImage{
					asset->{
						url
					},
					alt
				},
				publishedAt,
				shortDescription,
				categories[]->{title,	"slug": slug.current},
			}
		}
		`,
		{ slug: params.slug },
	);

	if (!category) {
		return <p>Category not found</p>;
	}

	return (
		<main className='px-4'>
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
				<h1 className='text-4xl font-bold font-poppins'>
					{category.title}
				</h1>

				<span className='flex items-center text-sec gap-2 py-2'>
					<h4 className='text-xl font-josefin '>
						{category.posts.length} posts
					</h4>

					<IoLocationOutline className='w-5 h-5' />
				</span>
			</div>

			{/* Category's Posts */}
			<div className='mt-4'>
				<h2 className='text-xl font-bold mb-4 font-poppins'>
					Posts in {category.title}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
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
