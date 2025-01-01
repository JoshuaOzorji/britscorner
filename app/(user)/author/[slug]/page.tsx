import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Author } from "@/types";
import { PostCard } from "@/components/PostCard";
import { IoLocationOutline } from "react-icons/io5";

interface AuthorPageProps {
	params: { slug: string };
}

const AuthorPage = async ({ params }: AuthorPageProps) => {
	const { slug } = params;

	const author: Author | null = await client.fetch(
		`
      *[_type == "author" && slug.current == $slug][0]{
        name,
        bio,
        image{
          asset->{
            url
          }
        },
        "posts": *[_type == "post" && references(^._id)]{
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
					},
        }
      }
    `,
		{ slug },
	);

	console.log(params);

	if (!author) {
		return <p>Author not found</p>;
	}

	return (
		<main className='px-4 '>
			{/* Author Information */}
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
					<div className=''>
						<h1 className='text-2xl font-bold font-poppins'>
							{author.name}
						</h1>
						<p className='font-josefin text-sec'>
							{author.bio}
						</p>
					</div>
				</div>

				<span className='flex items-center gap-2 py-2 text-sec'>
					<h4 className='text-xl font-josefin '>
						{author.posts?.length || 0}{" "}
						posts
					</h4>

					<IoLocationOutline className='w-5 h-5' />
				</span>
			</div>

			{/* Author's Posts */}
			<div className='mt-4'>
				<h2 className='mb-4 text-xl font-bold font-poppins'>
					Posts by {author.name}
				</h2>

				<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
					{author.posts?.map((post) => (
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

export default AuthorPage;
