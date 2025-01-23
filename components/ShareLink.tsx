"use client";

import { AiFillFacebook } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { TbCopy } from "react-icons/tb";
import toast from "react-hot-toast";
import { FaXTwitter } from "react-icons/fa6";

const ShareLink = ({
	postUrl,
	postTitle,
}: {
	postUrl: string;
	postTitle: string;
}) => {
	// Social share URLs
	const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;

	const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}&t=${encodeURIComponent(postTitle)}`;

	const whatsappShare = `https://wa.me/?text=${encodeURIComponent(postTitle + "\n" + postUrl)}`;
	//TODO: add double linebreaks

	// Copy link handler
	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(
				`${postTitle}\n\n${postUrl}`,
			);
			toast.success("Link copied to clipboard!");
		} catch (error) {
			console.error("Failed to copy:", error);
			toast.error("Failed to copy link.");
		}
	};

	return (
		<div className='flex items-center gap-4 py-2 text-gray-600 font-josefin'>
			{/* Twitter */}
			<a
				href={twitterShare}
				target='_blank'
				rel='noopener noreferrer'>
				<FaXTwitter className='social hover:text-black' />
			</a>

			{/* Facebook */}
			<a
				href={facebookShare}
				target='_blank'
				rel='noopener noreferrer'>
				<AiFillFacebook className='social hover:text-blue-600' />
			</a>

			{/* WhatsApp */}
			<a
				href={whatsappShare}
				target='_blank'
				rel='noopener noreferrer'
				className='hover:underline'>
				<FaWhatsapp className='social hover:text-green-600' />
			</a>

			{/* Copy Link */}
			<button
				onClick={copyLink}
				className='flex items-center gap-2 px-2 py-1 border rounded hover:bg-acc animate'>
				<p className='text-sm'>Copy Link</p>
				<TbCopy className='w-6 h-6' />
			</button>
		</div>
	);
};

export default ShareLink;
