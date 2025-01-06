import { formatDate } from "@/sanity/lib/formatDate";
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
						href={`/author/${author.slug.current}`}>
						<span className='hover-underline'>
							{author.name}
						</span>
					</Link>
				)}
			</div>

			<div>
				<span className='mx-1'>&bull;</span>
				<span>{formatDate(new Date(publishedAt))}</span>
			</div>
		</div>
	);
};

export default AuthorDate;
