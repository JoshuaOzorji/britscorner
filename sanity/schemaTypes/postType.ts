import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
	name: "post",
	title: "Post",
	type: "document",
	icon: DocumentTextIcon,
	fields: [
		defineField({
			name: "title",
			type: "string",
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: {
				source: "title",
			},
		}),
		defineField({
			name: "author",
			type: "reference",
			to: { type: "author" },
		}),
		defineField({
			name: "mainImage",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Alternative text",
				},
			],
		}),
		defineField({
			name: "categories",
			type: "array",
			of: [
				defineArrayMember({
					type: "reference",
					to: { type: "category" },
				}),
			],
		}),
		defineField({
			name: "publishedAt",
			type: "datetime",
		}),

		defineField({
			name: "shortDescription",
			type: "array",
			title: "Short Description",
			description:
				"A brief summary of the post content in bullet points (max 300 characters total).",
			of: [{ type: "string" }],
			validation: (Rule) =>
				Rule.custom((bullets) => {
					if (!bullets) return true;

					const totalLength =
						bullets.join("").length;

					if (totalLength > 400) {
						return `The total length of the short description exceeds 400 characters. Currently ${totalLength} characters.`;
					}

					return true;
				}),
		}),

		defineField({
			name: "body",
			type: "blockContent",
		}),

		// TAGS
		defineField({
			name: "tags",
			type: "array",
			of: [
				defineArrayMember({
					type: "reference",
					to: { type: "tag" },
				}),
			],
			title: "Tags",
			description: "Select relevant tags for this post",
		}),
	],
	preview: {
		select: {
			title: "title",
			author: "author.name",
			media: "mainImage",
		},
		prepare(selection) {
			const { author } = selection;
			return {
				...selection,
				subtitle: author && `by ${author}`,
			};
		},
	},
});
