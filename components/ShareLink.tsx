"use client";

import { AiOutlineTwitter, AiFillFacebook } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import toast from "react-hot-toast";

const ShareLink = ({
	postUrl,
	postTitle,
}: {
	postUrl: string;
	postTitle: string;
}) => {
	// Social share URLs
	const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;
	const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
	const whatsappShare = `https://wa.me/?text=${encodeURIComponent(postTitle + " " + postUrl)}`;

	// Copy link handler
	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(postUrl);
			toast.success("Link copied to clipboard!");
		} catch (error) {
			console.error("Failed to copy link:", error);
			toast.error("Failed to copy link.");
		}
	};

	return (
		<div className='flex items-center gap-4 mt-4'>
			{/* Twitter */}
			<a
				href={twitterShare}
				target='_blank'
				rel='noopener noreferrer'
				className='text-blue-500 hover:underline '>
				<AiOutlineTwitter className='social' />
			</a>

			{/* Facebook */}
			<a
				href={facebookShare}
				target='_blank'
				rel='noopener noreferrer'
				className='text-blue-700 hover:underline'>
				<AiFillFacebook className='social' />
			</a>

			{/* WhatsApp */}
			<a
				href={whatsappShare}
				target='_blank'
				rel='noopener noreferrer'
				className='text-green-500 hover:underline'>
				<FaWhatsapp className='social' />
			</a>

			{/* Copy Link */}
			<button
				onClick={copyLink}
				className='p-1 rounded hover:bg-gray-200'>
				<FaRegCopy className='w-5 h-5' />
			</button>
		</div>
	);
};

export default ShareLink;
