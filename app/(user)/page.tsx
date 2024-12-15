import { client } from "@/sanity/lib/client";
import HeroMain from "@/components/hero/HeroMain";
import { getHomepageCategoriesQuery } from "@/lib/queries/query";
import CategoryPosts from "@/components/CategoryPosts";
import { Category } from "@/types";

const page = async () => {
	const categoriesPosts = await client.fetch(getHomepageCategoriesQuery);

	if (!categoriesPosts) {
		return <p>Categories not found</p>;
	}

	return (
		<main>
			<HeroMain />
			<section className='py-8'>
				{categoriesPosts.map((category: Category) => (
					<CategoryPosts
						key={category._id}
						category={category}
					/>
				))}
			</section>
		</main>
	);
};

export default page;
