import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Author } from "@/types";
import { PostCard } from "@/components/PostCard";

interface AuthorPageProps {
	params: { slug: string };
}

const AuthorPage = async ({ params }: AuthorPageProps) => {
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
          title,
          slug,
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

	if (!author) {
		return <p>Author not found</p>;
	}

	console.log(author);

	return (
		<main className='container px-4 py-8 mx-auto'>
			{/* Author Information */}
			<div className='flex items-center gap-4'>
				{author.image?.asset?.url && (
					<Image
						src={author.image.asset.url}
						alt={author.name}
						className='object-cover w-24 h-24 rounded-full'
						width={96}
						height={96}
					/>
				)}
				<div>
					<h1 className='text-2xl font-bold'>
						{author.name}
					</h1>
					<p>{author.bio}</p>
				</div>
			</div>

			{/* Author's Posts */}
			<div className='mt-8'>
				<h2 className='mb-4 text-xl font-bold'>
					Posts by {author.name}
				</h2>
				<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
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
