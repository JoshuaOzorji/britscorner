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
			name: "description",
			type: "text",
			title: "description",
			description: "A brief summary of the post content",
			validation: (Rule) =>
				Rule.max(180).warning(
					"Short description should be under 200 characters",
				),
		}),

		defineField({
			name: "body",
			type: "blockContent",
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
