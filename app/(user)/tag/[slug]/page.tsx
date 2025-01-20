// import { client } from "@/sanity/lib/client";
// import { Post, Tag } from "@/types";
// import BreadCrumb from "@/components/BreadCrumb";
// import { PostCard } from "@/components/PostCard";
// import { IoLocationOutline } from "react-icons/io5";
// import Link from "next/link";

// const POSTS_PER_PAGE = 10;

// interface PageProps {
// 	params: {
// 		slug: string;
// 	};
// 	searchParams?: Record<string, string | string[] | undefined>;
// }

// const TagPage = async ({ params, searchParams = {} }: PageProps) => {
// 	const page = Number(searchParams.page) || 1;
// 	const start = (page - 1) * POSTS_PER_PAGE;

// 	const tag: Tag = await client.fetch(
// 		`*[_type == "tag" && slug.current == $slug][0]{
//       name,
//       description,
//       "totalPosts": count(*[_type == "post" && references(^._id)]),
//       "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) [$start...$end]{
//         _id,
//         title,
//         "slug": slug.current,
//         author->{
//           name,
//           "slug": slug.current
//         },
//         mainImage{
//           asset->{
//             url
//           },
//           alt
//         },
//         publishedAt,
//         shortDescription,
//         categories[]->{
//           title,
//           "slug": slug.current
//         }
//       }
//     }`,
// 		{ slug: params.slug, start, end: start + POSTS_PER_PAGE },
// 	);

// 	if (!tag) return <p>Tag not found</p>;

// 	const totalPages = Math.ceil(tag.totalPosts / POSTS_PER_PAGE);

// 	return (
// 		<main className='page-padding'>
// 			<BreadCrumb tagName={tag.name} />

// 			<div className='py-4 border-b'>
// 				<h1 className='text-3xl font-bold'>
// 					{tag.name}
// 				</h1>
// 				{tag.description && (
// 					<p className='mt-4 text-lg text-gray-700'>
// 						{tag.description}
// 					</p>
// 				)}
// 				<span className='flex items-center gap-2 py-2 text-sec'>
// 					<h4 className='text-xl font-josefin'>
// 						{tag.totalPosts} posts
// 					</h4>
// 					<IoLocationOutline className='w-5 h-5' />
// 				</span>
// 			</div>

// 			<div className='mt-8'>
// 				<h2 className='mb-4 text-xl font-bold font-poppins'>
// 					Posts in the{" "}
// 					<span className='underline'>
// 						{tag.name}
// 					</span>{" "}
// 					tag
// 				</h2>
// 				<div className='postcard-container'>
// 					{tag.posts.map((post: Post) => (
// 						<PostCard
// 							key={post._id}
// 							post={post}
// 						/>
// 					))}
// 				</div>

// 				{totalPages > 1 && (
// 					<div className='flex justify-center gap-4 mt-8 text-xs md:text-sm font-poppins text-sec'>
// 						{page > 1 && (
// 							<Link
// 								href={`/tag/${params.slug}?page=${page - 1}`}
// 								className='pagination-button'>
// 								Prev
// 							</Link>
// 						)}

// 						{Array.from(
// 							{ length: totalPages },
// 							(_, i) => i + 1,
// 						).map((pageNum) => (
// 							<Link
// 								key={pageNum}
// 								href={`/tag/${params.slug}?page=${pageNum}`}
// 								className={`pagination-button ${
// 									pageNum ===
// 									page
// 										? "bg-pry text-white"
// 										: "hover:bg-white hover:text-sec"
// 								}`}>
// 								{pageNum}
// 							</Link>
// 						))}

// 						{page < totalPages && (
// 							<Link
// 								href={`/tag/${params.slug}?page=${page + 1}`}
// 								className='pagination-button'>
// 								Next
// 							</Link>
// 						)}
// 					</div>
// 				)}
// 			</div>
// 		</main>
// 	);
// };

// export default TagPage;
import { client } from "@/sanity/lib/client";
import { Post, Tag } from "@/types";
import BreadCrumb from "@/components/BreadCrumb";
import { PostCard } from "@/components/PostCard";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";

const POSTS_PER_PAGE = 10;

interface Params {
	slug: string;
}

interface PageProps {
	params: Params;
	searchParams?: Record<string, string | string[] | undefined>;
}

// Generates static params for SSG
export const generateStaticParams = async (): Promise<Params[]> => {
	const tags = await client.fetch(
		`*[_type == "tag"]{ "slug": slug.current }`,
	);
	return tags.map((tag: { slug: string }) => ({ slug: tag.slug }));
};

// The main page component
const TagPage = async ({ params, searchParams = {} }: PageProps) => {
	const page = Number(searchParams.page) || 1;
	const start = (page - 1) * POSTS_PER_PAGE;

	const tag: Tag = await client.fetch(
		`*[_type == "tag" && slug.current == $slug][0]{
      name,
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
		{ slug: params.slug, start, end: start + POSTS_PER_PAGE },
	);

	if (!tag) return <p>Tag not found</p>;

	const totalPages = Math.ceil(tag.totalPosts / POSTS_PER_PAGE);

	return (
		<main className='page-padding'>
			<BreadCrumb tagName={tag.name} />

			<div className='py-4 border-b'>
				<h1 className='text-3xl font-bold'>
					{tag.name}
				</h1>
				{tag.description && (
					<p className='mt-4 text-lg text-gray-700'>
						{tag.description}
					</p>
				)}
				<span className='flex items-center gap-2 py-2 text-sec'>
					<h4 className='text-xl font-josefin'>
						{tag.totalPosts} posts
					</h4>
					<IoLocationOutline className='w-5 h-5' />
				</span>
			</div>

			<div className='mt-8'>
				<h2 className='mb-4 text-xl font-bold font-poppins'>
					Posts in the{" "}
					<span className='underline'>
						{tag.name}
					</span>{" "}
					tag
				</h2>
				<div className='postcard-container'>
					{tag.posts.map((post: Post) => (
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
								href={`/tag/${params.slug}?page=${page - 1}`}
								className='pagination-button'>
								Prev
							</Link>
						)}

						{Array.from(
							{ length: totalPages },
							(_, i) => i + 1,
						).map((pageNum) => (
							<Link
								key={pageNum}
								href={`/tag/${params.slug}?page=${pageNum}`}
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
								href={`/tag/${params.slug}?page=${page + 1}`}
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

export default TagPage;
