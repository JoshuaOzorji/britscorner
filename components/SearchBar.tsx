// import {
// 	Sheet,
// 	SheetContent,
// 	SheetHeader,
// 	SheetTitle,
// 	SheetClose,
// } from "@/components/ui/sheet";
// import { CiSearch } from "react-icons/ci";
// import { TfiClose } from "react-icons/tfi";

// interface SearchBarProps {
// 	isOpen: boolean;
// 	onClose: () => void;
// }

// const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
// 	return (
// 		<Sheet open={isOpen} onOpenChange={onClose}>
// 			<SheetContent
// 				side='top'
// 				className='p-3 font-inconsolata md:p-4'>
// 				<SheetHeader className='w-[94%] md:w-[90%] mx-auto p'>
// 					<SheetTitle className='flex items-center justify-between gap-4 w-[100%] md:w-[80%] mx-auto px-1 '>
// 						<div className='relative w-full'>
// 							<button>
// 								<CiSearch className='absolute w-6 h-6 text-gray-500 transform -translate-y-1/2 right-3 top-1/2' />
// 							</button>

// 							<input
// 								type='text'
// 								name=''
// 								placeholder='Search...'
// 								className='w-full p-2 border-2 border-black focus:outline-none'
// 							/>
// 						</div>

// 						<SheetClose>
// 							<TfiClose className='cursor-pointer h-7 w-7' />
// 						</SheetClose>
// 					</SheetTitle>
// 				</SheetHeader>
// 			</SheetContent>
// 		</Sheet>
// 	);
// };

// export default SearchBar;

import { useState } from "react";
import Link from "next/link";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetClose,
} from "@/components/ui/sheet";
import { CiSearch } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";

interface SearchBarProps {
	isOpen: boolean;
	onClose: () => void;
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
	const [query, setQuery] = useState(""); // State for the search input
	const [results, setResults] = useState<any[]>([]); // State for search results
	const [error, setError] = useState<string | null>(null); // State for errors
	const [loading, setLoading] = useState(false); // State for loading

	// Function to handle search query
	const handleSearch = async () => {
		setLoading(true);
		setError(null);

		try {
			const res = await fetch(
				`/api/search?query=${encodeURIComponent(query)}`,
			);
			if (!res.ok) throw new Error(`Error: ${res.status}`);
			const data = await res.json();
			setResults(data);
		} catch (err) {
			setError("Failed to fetch search results.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent
				side='top'
				className='p-3 font-inconsolata md:p-4'>
				<SheetHeader className='w-[94%] md:w-[90%] mx-auto'>
					<SheetTitle className='flex flex-col items-center justify-center gap-4 w-[100%] md:w-[80%] mx-auto'>
						<div className='relative w-full flex items-center gap-2'>
							<input
								type='text'
								value={query}
								onChange={(e) =>
									setQuery(
										e
											.target
											.value,
									)
								}
								placeholder='Search...'
								className='w-full p-2 border-2 border-black focus:outline-none'
							/>
							<button
								onClick={
									handleSearch
								}
								disabled={
									loading
								}
								className='text-gray-500 hover:text-black'>
								<CiSearch className='w-6 h-6' />
							</button>
							<SheetClose>
								<TfiClose className='cursor-pointer h-7 w-7' />
							</SheetClose>
						</div>

						{/* Display results */}
						<div className='mt-4 w-full'>
							{loading && (
								<p>
									Loading...
								</p>
							)}
							{error && (
								<p className='text-red-500'>
									{error}
								</p>
							)}
							{results.length > 0 && (
								<ul className='list-none'>
									{results.map(
										(
											result,
										) => (
											<li
												key={
													result._id
												}
												className='mb-4'>
												<Link
													href={`/post/${result.slug.current}`}
													className='block hover:underline'>
													<p className='font-medium'>
														{
															result.title
														}
													</p>
													<p className='text-sm text-gray-600'>
														{
															result.shortDescription
														}
													</p>
												</Link>
											</li>
										),
									)}
								</ul>
							)}
						</div>
					</SheetTitle>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default SearchBar;
