import { PortableTextBlock } from "@portabletext/types";

export interface Post {
	_id: string;
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
	shortDescription: string;
	body: PortableTextBlock[];
}
