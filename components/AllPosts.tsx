import Link from "next/link";

const AllPosts = () => {
	return (
		<div className='text-center font-inconsolata text-sm md:text-lg'>
			<Link href='/posts'>
				<span className='text-pry hover-underline'>
					View All Posts
				</span>
			</Link>
		</div>
	);
};

export default AllPosts;
