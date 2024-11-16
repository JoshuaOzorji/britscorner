interface PostPageProps {
	params: { slug: string };
}

const PostPage = ({ params }: PostPageProps) => {
	return (
		<div>
			<h1>Post: {params.slug}</h1>
			<p>This is a dynamic route for post: {params.slug}</p>
		</div>
	);
};

export default PostPage;
