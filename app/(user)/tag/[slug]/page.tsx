import { client } from "@/sanity/lib/client";
import { Post, Tag } from "@/types";
import BreadCrumb from "@/components/BreadCrumb";
import { PostCard } from "@/components/PostCard";
import { IoLocationOutline } from "react-icons/io5";

interface TagPageProps {
	params: { slug: string };
}

const TagPage = async ({ params }: TagPageProps) => {
	const tag: Tag = await client.fetch(
		`*[_type == "tag" && slug.current == $slug][0]{
      name,
      description,
      "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc){
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
				categories[]->{title,	"slug": slug.current},
      }
    }`,
		{ slug: params.slug },
	);

	if (!tag) {
		return <p>Tag not found</p>;
	}

	return (
		<main className='mx-auto'>
			<BreadCrumb
				categories={[
					{ title: tag.name, slug: params.slug },
				]}
			/>
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
					<h4 className='text-xl font-josefin '>
						{tag.posts.length} posts
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
				<div className='flex flex-wrap gap-6 sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
					{tag.posts.map((post: Post) => (
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
export default TagPage;
