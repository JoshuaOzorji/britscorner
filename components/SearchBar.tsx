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

interface SearchResult {
	_id: string;
	title: string;
	slug: { current: string };
	shortDescription?: string;
}

interface SearchBarProps {
	isOpen: boolean;
	onClose: () => void;
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [relatedResults, setRelatedResults] = useState<SearchResult[]>(
		[],
	);
	const [message, setMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSearch = async () => {
		setLoading(true);
		setError(null);
		setMessage(null);

		try {
			const res = await fetch(
				`/api/search?query=${encodeURIComponent(query)}`,
			);
			if (!res.ok) throw new Error(`Error: ${res.status}`);
			const data = await res.json();

			if (data.message) {
				// Handle case for no exact matches
				setMessage(data.message);
				if (data.relatedResults)
					setRelatedResults(data.relatedResults);
			} else {
				// Handle case for exact matches
				setResults(data);
			}
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
				className='p-3 font-inconsolata md:p-4 max-h-screen overflow-y-auto'>
				<SheetHeader className='w-[94%] md:w-[90%] mx-auto'>
					<SheetTitle className='flex flex-col items-center justify-center gap-4 w-[100%] md:w-[80%] mx-auto'>
						<div className='relative w-full flex items-center gap-2 md:gap-4'>
							<div className='relative w-full'>
								<input
									type='text'
									value={
										query
									}
									onChange={(
										e,
									) =>
										setQuery(
											e
												.target
												.value,
										)
									}
									placeholder='Search...'
									className='w-full p-2 px-6 border-2 border-black focus:outline-none'
								/>
								<button
									onClick={
										handleSearch
									}
									disabled={
										loading
									}
									className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-900 hover:bg-slate-300 bg-gray-900/10 rounded-lg animate'>
									<CiSearch className='w-8 h-8 space-x-6' />
								</button>
							</div>
							<SheetClose>
								<TfiClose className='cursor-pointer h-7 w-7 animate' />
							</SheetClose>
						</div>

						<div className='mt-4 w-full text-base md:text-lg px-2'>
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

							{/* Render Results */}
							<div className='max-h-[400px] overflow-y-auto scrollBar'>
								{results.length >
									0 && (
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
														className='block hover:underline'
														onClick={
															onClose
														}>
														<p className='font-medium'>
															{
																result.title
															}
														</p>
													</Link>
												</li>
											),
										)}
									</ul>
								)}
							</div>

							{/* Render Related Results */}
							{relatedResults.length >
								0 && (
								<div>
									<p className='font-bold text-black text-lg md:text-2xl uppercase pb-3'>
										No
										exact
										matches
										found,
										but
										here
										are
										some
										related
										results:
									</p>
									<ul className='list-none'>
										{relatedResults.map(
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
														className='block hover:underline'
														onClick={
															onClose
														}>
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
								</div>
							)}

							{/* No Results Message */}
							{message &&
								!relatedResults.length && (
									<p className='text-gray-600'>
										{
											message
										}
									</p>
								)}
						</div>
					</SheetTitle>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default SearchBar;
