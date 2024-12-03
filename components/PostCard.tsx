import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { MdPlayArrow } from "react-icons/md";
import CategoryLinks from "./CategoryLinks";

export const PostCard = ({ post }: { post: Post }) => (
	<div className=''>
		{post.mainImage?.asset?.url && (
			<Image
				src={post.mainImage.asset.url}
				alt={post.mainImage.alt || "Post image"}
				className='object-cover w-full h-[20vh] rounded-lg'
				width={300}
				height={200}
			/>
		)}
		<div className='p-2 shadow-inherit border-b rounded-b rounded-lg'>
			<div className='flex items-center gap-1 md:p-1'>
				<MdPlayArrow className='w-3 h-3' />
				<CategoryLinks
					categories={post?.categories || []}
				/>
			</div>
			<Link
				href={`/post/${post.slug}`}
				className='text-base font-semibold font-poppins hover:underline decoration-inherit animate'>
				{post.title}
			</Link>

			<div className='author-date'>
				<Link
					href={`/author/${post.author?.slug?.current}`}>
					by{" "}
					<span className='post-author'>
						{post.author?.name ||
							"Unknown author"}{" "}
					</span>
				</Link>

				<p>
					{new Date(
						post.publishedAt,
					).toDateString()}
				</p>
			</div>

			{/* <Link
				href={`/post/${post.slug}`}
				className='mt-4 text-pry text-sm hover:underline'>
				Read more
			</Link> */}
		</div>
	</div>
);
