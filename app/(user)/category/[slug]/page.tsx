import BreadCrumb from "@/components/BreadCrumb";
import { PostCard } from "@/components/PostCard";
import { client } from "@/sanity/lib/client";
import { Category } from "@/types";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";

const POSTS_PER_PAGE = 10;

type Props = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const CategoryPage = async (props: Props) => {
	const searchParams = await props.searchParams;
	const params = await props.params;
	// Await both params and searchParams
	const [{ slug }, searchParamsData] = await Promise.all([
		params,
		searchParams,
	]);

	const page = Number(searchParamsData?.page) || 1;
	const start = (page - 1) * POSTS_PER_PAGE;

	const category: Category = await client.fetch(
		`*[_type == "category" && slug.current == $slug][0]{
            title,
            description,
            "totalPosts": count(*[_type == "post" && references(^._id)]),
            "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) [$start...$end]{
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
            }
        }`,
		{ slug, start, end: start + POSTS_PER_PAGE },
	);

	if (!category) return <p>Category not found</p>;

	const totalPages = Math.ceil(category.totalPosts / POSTS_PER_PAGE);

	return (
		<main className='page-padding'>
			<BreadCrumb
				categories={[
					{
						title: category.title,
						slug,
					},
				]}
			/>

			<div className='py-2 border-b'>
				<h1 className='text-2xl font-bold md:text-4xl font-poppins'>
					{category.title} Category
				</h1>
				<span className='flex items-center gap-2 py-2 text-sec'>
					<h4 className='text-xl font-josefin'>
						{category.totalPosts} posts
					</h4>
					<IoLocationOutline className='w-5 h-5' />
				</span>
			</div>

			<div className='mt-4'>
				<h2 className='mb-4 text-xl font-bold font-poppins'>
					Posts in {category.title}
				</h2>
				<div className='postcard-container'>
					{category.posts.map((post) => (
						<PostCard
							key={post._id}
							post={post}
						/>
					))}
				</div>

				{totalPages > 1 && (
					<div className='flex justify-center gap-4 mt-8 text-xs md:text-sm font-poppins text-sec'>
						{page > 1 && (
							<Link
								href={`/category/${slug}?page=${page - 1}`}
								className='pagination-button'>
								Prev
							</Link>
						)}

						{Array.from(
							{
								length: totalPages,
							},
							(_, i) => i + 1,
						).map((pageNum) => (
							<Link
								key={pageNum}
								href={`/category/${slug}?page=${pageNum}`}
								className={`pagination-button ${
									pageNum ===
									page
										? "bg-pry text-white"
										: "hover:bg-white hover:text-sec"
								}`}>
								{pageNum}
							</Link>
						))}

						{page < totalPages && (
							<Link
								href={`/category/${slug}?page=${page + 1}`}
								className='pagination-button'>
								Next
							</Link>
						)}
					</div>
				)}
			</div>
		</main>
	);
};

export default CategoryPage;
