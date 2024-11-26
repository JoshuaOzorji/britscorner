import Link from "next/link";
import {
	AiOutlineTwitter,
	AiFillFacebook,
	AiFillLinkedin,
} from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";

const ShareLink = () => {
	return (
		<main>
			<div className='flex flex-row bg-primary gap-2 p-2'>
				<Link
					href={`http://www.facebook.com/sharer.php?u=${encodeURIComponent(
						post.slug.current,
					)}&p[title]=${encodeURIComponent(post.title)}`}>
					<span className='text-accent2 hover:text-accent cursor-pointer'>
						<AiFillFacebook className='w-8 h-8' />
					</span>
				</Link>

				<Link
					href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
						post.slug.current,
					)}&text=${encodeURIComponent(post.title)}`}>
					<span className='text-accent2 hover:text-accent cursor-pointer'>
						<AiOutlineTwitter className='w-8 h-8' />
					</span>
				</Link>
				<Link
					href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
						post.title,
					)}%20${encodeURIComponent(post.slug.current)}`}>
					<span className='text-accent2 hover:text-accent cursor-pointer'>
						<FaWhatsapp className='w-8 h-8' />
					</span>
				</Link>
				<Link
					href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
						post.slug.current,
					)}&title=${encodeURIComponent(post.title)}`}>
					<span className='text-accent2 hover:text-accent cursor-pointer'>
						<AiFillLinkedin className='w-8 h-8' />
					</span>
				</Link>
			</div>
		</main>
	);
};

export default ShareLink;
