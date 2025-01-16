import { Post } from "@/types";
import Image from "next/legacy/image";
import Link from "next/link";
import { MdPlayArrow } from "react-icons/md";
import CategoryLinks from "./CategoryLinks";
import { formatDate } from "@/sanity/lib/formatDate";

export const PostCard = ({ post }: { post: Post }) => (
	<div className='flex flex-row items-center w-full bg-white border-b rounded-lg rounded-b group md:flex-col shadow-inherit md:items-start md:block md:border-none'>
		<div className='px-2'>
			{post.mainImage?.asset?.url && (
				<div className='relative w-[12vh] md:w-full h-[12vh] md:h-[18vh]'>
					<Image
						src={post.mainImage.asset.url}
						alt={
							post.mainImage.alt ||
							"Post image"
						}
						className='object-cover rounded-lg group-hover:opacity-75'
						layout='fill'
						objectFit='cover'
						objectPosition='center'
					/>
				</div>
			)}
		</div>

		<div className='p-1 rounded-lg rounded-b md:px-3 md:border-b shadow-inherit'>
			<div className='flex items-center gap-1 '>
				<MdPlayArrow className='w-3 h-3' />
				<CategoryLinks
					categories={post?.categories || []}
				/>
			</div>

			<Link href={`/post/${post.slug}`}>
				<p className='text-sm font-semibold tracking-tight md:text-base font-poppins group-hover:underline decoration-inherit animate'>
					{post.title}
				</p>
			</Link>

			<div className='flex-wrap author-date'>
				{post.author?.slug ? (
					<Link
						href={`/author/${post.author.slug}`}>
						<span className='mx-1'>
							&bull;
						</span>
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

				<div>
					<span className='mx-1'>&bull;</span>{" "}
					<span>
						{formatDate(
							new Date(
								post.publishedAt,
							),
						)}
					</span>
				</div>
			</div>
		</div>
	</div>
);
