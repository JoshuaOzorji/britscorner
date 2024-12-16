import Link from "next/link";

interface AuthorDateProps {
	author?: {
		name?: string;
		slug?: { current: string };
	};
	publishedAt: string;
}

const AuthorDate = ({ author, publishedAt }: AuthorDateProps) => {
	return (
		<div className='author-date'>
			<div>
				<span className='mx-1'>&bull;</span>by{" "}
				{author?.name && author?.slug?.current && (
					<Link
						href={`/author/${author.slug.current}`}
						className='text-sec underline hover:text-pry'>
						{author.name}
					</Link>
				)}
			</div>

			<div>
				<span className='mx-1'>&bull;</span>
				<span>
					{new Date(publishedAt).toDateString()}
				</span>
			</div>
		</div>
	);
};

export default AuthorDate;
