import Link from "next/link";

interface BreadCrumbProps {
	categories: { title: string; slug: string }[];
	postTitle?: string; // Optional
}

const BreadCrumb = ({ categories, postTitle }: BreadCrumbProps) => {
	return (
		<nav className='my-3 text-sm font-medium text-sec font-josefin'>
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
				{categories.map((category, index) => (
					<li
						key={category.slug}
						className='inline-flex items-center'>
						<Link
							href={`/category/${category.slug}`}>
							<p className='hover:underline'>
								{category.title}
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
