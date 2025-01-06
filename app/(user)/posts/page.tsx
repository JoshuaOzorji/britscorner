// import { client } from "@/sanity/lib/client";
// import { Post } from "@/types";
// import { PostCard } from "@/components/PostCard";

// const PostsPage = async () => {
// 	const posts: Post[] | null = await client.fetch(
// 		`*[_type == "post"] | order(publishedAt desc){
//       _id,
//       title,
//       "slug": slug.current,
//       author->{
//         name,
//         "slug": slug.current
//       },
//       mainImage{
//         asset->{
//           url
//         },
//         alt
//       },
//       publishedAt,
//       shortDescription,
//       categories[]->{
//         title,
//         "slug": slug.current
//       }
//     }`,
// 	);

// 	if (!posts) {
// 		return <p>Post not found</p>;
// 	}

// 	return (
// 		<main className='page-padding'>
// 			<div className='py-4 border-b'>
// 				<h1 className='text-3xl font-bold'>
// 					All Posts
// 				</h1>
// 				<span className='flex items-center gap-2 py-2 text-sec'>
// 					<h4 className='text-xl font-josefin'>
// 						{posts.length} posts
// 					</h4>
// 				</span>
// 			</div>

// 			<div className='mt-8'>
// 				<div className='flex flex-wrap gap-6 sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
// 					{posts.map((post: Post) => (
// 						<PostCard
// 							key={post._id}
// 							post={post}
// 						/>
// 					))}
// 				</div>
// 			</div>
// 		</main>
// 	);
// };

// export default PostsPage;

"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types";
import { PostCard } from "@/components/PostCard";

const fetchCategories = async () => {
	return await client.fetch(
		`*[_type == "category"]{ title, "slug": slug.current }`,
	);
};

const fetchPosts = async (categorySlug?: string) => {
	const categoryFilter = categorySlug
		? `&& "${categorySlug}" in categories[].slug`
		: "";
	return await client.fetch(
		`*[_type == "post" ${categoryFilter}] | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      author->{
        name,
        "slug": slug.current
      },
      mainImage{
        asset->{
          url
        },
        alt
      },
      publishedAt,
      shortDescription,
      categories[]->{
        title,
        "slug": slug.current
      }
    }`,
	);
};

const PostsPage = () => {
	const [categories, setCategories] = useState<
		{ title: string; slug: string }[]
	>([]);
	const [posts, setPosts] = useState<Post[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<
		string | undefined
	>(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [fetchedCategories, fetchedPosts] =
					await Promise.all([
						fetchCategories(),
						fetchPosts(),
					]);
				setCategories(fetchedCategories);
				setPosts(fetchedPosts);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleCategoryChange = async (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const categorySlug = event.target.value || undefined;
		setSelectedCategory(categorySlug);
		setLoading(true);
		const filteredPosts = await fetchPosts(categorySlug);
		setPosts(filteredPosts);
		setLoading(false);
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	if (!posts.length) {
		return <p>No posts found for the selected category.</p>;
	}

	return (
		<main className='page-padding'>
			<div className='py-4 border-b'>
				<h1 className='text-3xl font-bold'>
					All Posts
				</h1>
				<span className='flex items-center gap-2 py-2 text-sec'>
					<h4 className='text-xl font-josefin'>
						{posts.length} posts
					</h4>
				</span>
				<div className='mt-4'>
					<select
						className='border p-2 rounded'
						value={selectedCategory || ""}
						onChange={handleCategoryChange}>
						<option value=''>
							All Categories
						</option>
						{categories.map((category) => (
							<option
								key={
									category.slug
								}
								value={
									category.slug
								}>
								{category.title}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className='mt-8'>
				<div className='flex flex-wrap gap-6 sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
					{posts.map((post) => (
						<PostCard
							key={post._id}
							post={post}
						/>
					))}
				</div>
			</div>
		</main>
	);
};

export default PostsPage;
