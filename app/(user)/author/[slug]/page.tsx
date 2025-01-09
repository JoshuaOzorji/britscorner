import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Author } from "@/types";
import { PostCard } from "@/components/PostCard";
import { IoLocationOutline } from "react-icons/io5";
import BreadCrumb from "@/components/BreadCrumb";
import Link from "next/link";

const POSTS_PER_PAGE = 10;

type Props = {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
};

const AuthorPage = async ({ params, searchParams }: Props) => {
	const { slug } = params;
	const page = Number(searchParams?.page) || 1;
	const start = (page - 1) * POSTS_PER_PAGE;

	const author: Author | null = await client.fetch(
		`*[_type == "author" && slug.current == $slug][0]{
      name,
      bio,
      image{
        asset->{
          url
        }
      },
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

	if (!author) return <p>Author not found</p>;

	const totalPages = Math.ceil(author.totalPosts / POSTS_PER_PAGE);

	return (
		<main className='page-padding'>
			<BreadCrumb authorName={author.name} />

			<div className='pb-4 border-b'>
				<div className='flex items-center gap-4 py-4'>
					{author.image?.asset?.url && (
						<Image
							src={
								author.image
									.asset
									.url
							}
							alt={author.name}
							className='object-cover w-16 h-16 rounded-full md:w-20 md:h-20'
							width={96}
							height={96}
						/>
					)}
					<div>
						<h1 className='text-2xl font-bold font-poppins'>
							{author.name}
						</h1>
						<p className='font-josefin text-sec'>
							{author.bio}
						</p>
					</div>
				</div>

				<span className='flex items-center gap-2 py-2 text-sec'>
					<h4 className='text-xl font-josefin'>
						{author.totalPosts || 0} posts
					</h4>
					<IoLocationOutline className='w-5 h-5' />
				</span>
			</div>

			<div className='mt-4'>
				<h2 className='mb-4 text-xl font-bold font-poppins'>
					Posts by {author.name}
				</h2>

				<div className='postcard-container'>
					{author.posts?.map((post) => (
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
								href={`/author/${slug}?page=${page - 1}`}
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
								href={`/author/${slug}?page=${pageNum}`}
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
								href={`/author/${slug}?page=${page + 1}`}
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

export default AuthorPage;
