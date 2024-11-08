export interface Post {
	title: string;
	slug: { current: string };
	author?: { name: string };
	mainImage?: {
		asset: {
			url: string;
		};
		alt: string;
	};
	publishedAt: string;
	body: unknown;
}
