import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export const tagType = defineType({
	name: "tag",
	title: "Tag",
	type: "document",
	icon: TagIcon,
	fields: [
		defineField({
			name: "name",
			type: "string",
			title: "Tag Name",
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Tag Description",
			description: "A brief description for this tag",
		}),
	],
});
