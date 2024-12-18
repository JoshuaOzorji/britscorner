import Link from "next/link";

const AllPosts = () => {
	return (
		<div className='text-center font-inconsolata text-sm md:text-lg'>
			<Link
				href='/posts'
				className='text-pry hover-underline'>
				View All Posts
			</Link>
		</div>
	);
};

export default AllPosts;
