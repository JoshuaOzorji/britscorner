import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { MdPlayArrow } from "react-icons/md";
import CategoryLinks from "./CategoryLinks";

export const PostCard = ({ post }: { post: Post }) => (
	<div className='group'>
		{post.mainImage?.asset?.url && (
			<Image
				src={post.mainImage.asset.url}
				alt={post.mainImage.alt || "Post image"}
				className='object-cover w-full h-[20vh] rounded-lg group-hover:opacity-75'
				width={300}
				height={200}
			/>
		)}
		<div className='p-1 border-b rounded-lg rounded-b shadow-inherit'>
			<div className='flex items-center gap-1 '>
				<MdPlayArrow className='w-3 h-3' />
				<CategoryLinks
					categories={post?.categories || []}
				/>
			</div>
			<Link
				href={`/post/${post.slug}`}
				className='text-sm font-semibold tracking-tight md:text-base font-poppins group-hover:underline decoration-inherit animate'>
				{post.title}
			</Link>

			<div className='author-date'>
				{post.author?.slug ? (
					<Link
						href={`/author/${post.author.slug}`}>
						by{" "}
						<span className='post-author'>
							{post.author.name}
						</span>
					</Link>
				) : (
					<span className='post-author'>
						Unknown author
					</span>
				)}

				<p>
					{new Date(
						post.publishedAt,
					).toDateString()}
				</p>
			</div>
		</div>
	</div>
);
