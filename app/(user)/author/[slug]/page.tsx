import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { Author } from "@/types";

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

	return (
		<main className='container mx-auto px-4 py-8'>
			{/* Author Information */}
			<div className='flex items-center gap-4'>
				{author.image?.asset?.url && (
					<Image
						src={author.image.asset.url}
						alt={author.name}
						className='w-24 h-24 rounded-full object-cover'
						width={96}
						height={96}
					/>
				)}
				<div>
					<h1 className='text-2xl font-bold'>
						{author.name}
					</h1>
					{author.bio && <p>{author.bio}</p>}
				</div>
			</div>

			{/* Author's Posts */}
			<div className='mt-8'>
				<h2 className='text-xl font-bold mb-4'>
					Posts by {author.name}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{author.posts.map((post) => (
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
								href={`/posts/${post.slug.current}`}
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

export default AuthorPage;
