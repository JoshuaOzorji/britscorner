import Link from "next/link";

interface BreadCrumbProps {
	categories: { title: string; slug: string }[];
	postTitle?: string; // Optional
}

const BreadCrumb = ({ categories, postTitle }: BreadCrumbProps) => {
	return (
		<nav className='my-5 text-sm font-medium text-sec font-josefin'>
			<ul className='flex flex-wrap items-center gap-2'>
				{/* Home */}
				<li>
					<Link
						href='/'
						className='hover:underline'>
						Home
					</Link>
				</li>
				<span> {">"} </span>

				{/* Categories */}
				{categories.map((category, index) => (
					<li
						key={category.slug}
						className='inline-flex items-center'>
						<Link
							href={`/category/${category.slug}`}
							className='hover:underline'>
							<p>{category.title}</p>
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

				{/* Render postTitle only if provided */}
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
