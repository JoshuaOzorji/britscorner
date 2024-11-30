import { PortableTextBlock } from "@portabletext/types";

export interface Post {
	_id: string;
	title: string;
	slug: { current: string };
	author?: { name: string; slug: { current: string } };
	mainImage?: {
		asset: {
			_ref: string;
			url: string;
		};
		alt: string;
	};
	categories: { _id: string; title: string; slug: string }[];
	publishedAt: string;
	shortDescription: string[];
	body: PortableTextBlock[];
	tags?: { _id: string; name: string; slug: { current: string } }[];
}

export interface Category {
	_id: string;
	title: string;
	description?: string;
	posts: Post[];
}

export interface Author {
	_id: string;
	name: string;
	bio?: string;
	image?: {
		asset: {
			url: string;
		};
	};
	posts: Post[];
}

export interface Tag {
	_id: string;
	name: string;
	slug: {
		current: string;
	};
	description?: string;
	posts: Post[];
}
