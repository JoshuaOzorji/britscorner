import Link from "next/link";

interface BreadCrumbProps {
	categories?: { title: string; slug: string }[];
	postTitle?: string;
	tagName?: string;
	authorName?: string;
}

const BreadCrumb = ({
	categories,
	postTitle,
	tagName,
	authorName,
}: BreadCrumbProps) => {
	return (
		<nav className='my-3 text-[13px] font-medium text-sec font-inconsolata'>
			<ul className='flex flex-wrap items-center gap-2'>
				{/* Home */}
				<li>
					<Link href='/'>
						<span className='hover:underline'>
							Home
						</span>
					</Link>
				</li>
				<span> {">"} </span>

				{/* Categories */}
				{categories &&
					categories.map((category, index) => (
						<li
							key={category.slug}
							className='inline-flex items-center'>
							<Link
								href={`/category/${category.slug}`}>
								<p className='hover:underline'>
									{
										category.title
									}
								</p>
							</Link>
							{index <
								categories.length -
									1 && (
								<span className='pl-2'>
									|
								</span>
							)}
						</li>
					))}

				{/* Tag Page */}
				{tagName && (
					<>
						<li>
							<span className='text-gray-800'>
								Tag
							</span>
						</li>
						<span> {">"} </span>
						<li className='text-gray-800'>
							{tagName}
						</li>
					</>
				)}

				{/* Author Page */}
				{authorName && (
					<>
						<li>
							<span className='text-gray-800'>
								Author
							</span>
						</li>
						<span> {">"} </span>
						<li className='text-gray-800'>
							{authorName}
						</li>
					</>
				)}

				{/* Post Title */}
				{postTitle && (
					<>
						<span> {">"} </span>
						<li className='text-gray-800'>
							{postTitle}
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default BreadCrumb;
