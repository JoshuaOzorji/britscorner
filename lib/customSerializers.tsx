import {
	PortableTextComponents,
	PortableTextTypeComponentProps,
} from "@portabletext/react";

interface BlockNode {
	_type: string;
	style: string;
	children: Array<{ text: string }>;
}

export const customSerializers: PortableTextComponents = {
	types: {
		block: ({
			value,
		}: PortableTextTypeComponentProps<BlockNode>) => {
			const node = value;
			if (!node?.style)
				return (
					<p className='mt-4 text-gray-700'>
						{node.children.map(
							(child) => child.text,
						)}
					</p>
				);

			switch (node.style) {
				case "h1":
					return (
						<h1 className='text-4xl font-bold mt-4'>
							{node.children.map(
								(child) =>
									child.text,
							)}
						</h1>
					);
				case "h2":
					return (
						<h2 className='text-3xl font-semibold mt-4'>
							{node.children.map(
								(child) =>
									child.text,
							)}
						</h2>
					);
				case "h3":
					return (
						<h3 className='text-2xl font-medium mt-4'>
							{node.children.map(
								(child) =>
									child.text,
							)}
						</h3>
					);
				case "blockquote":
					return (
						<blockquote className='italic border-l-4 pl-4 mt-4 text-gray-700'>
							{node.children.map(
								(child) =>
									child.text,
							)}
						</blockquote>
					);
				default:
					return (
						<p className='mt-4 text-gray-700'>
							{node.children.map(
								(child) =>
									child.text,
							)}
						</p>
					);
			}
		},
	},
};
