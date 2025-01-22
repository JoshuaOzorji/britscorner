import { client } from "@/sanity/lib/client";
import HeroMain from "@/components/hero/HeroMain";
import { getHomepageCategoriesQuery } from "@/lib/queries/query";
import CategoryPosts from "@/components/CategoryPosts";
import { Category } from "@/types";
import AllPosts from "@/components/AllPosts";
import { Suspense } from "react";

const page = async () => {
	const categoriesPosts = await client.fetch(getHomepageCategoriesQuery);

	if (!categoriesPosts) {
		return <p>Categories not found</p>;
	}

	return (
		<Suspense fallback={null}>
			<main>
				<HeroMain />
				<section className='py-8'>
					{categoriesPosts.map(
						(category: Category) => (
							<CategoryPosts
								key={
									category._id
								}
								category={
									category
								}
							/>
						),
					)}
				</section>
				<AllPosts />
			</main>
		</Suspense>
	);
};

export default page;
