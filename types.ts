export interface Post {
	title: string;
	slug: { current: string };
	author?: { name: string };
	mainImage?: {
		asset: {
			_ref: string;
			url: string;
		};
		alt: string;
	};
	categories: { title: string }[];
	publishedAt: string;
	body: unknown;
}
