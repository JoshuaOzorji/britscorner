import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetClose,
} from "@/components/ui/sheet";
import { CiSearch } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";

interface Author {
	_id: string;
	name: string;
	image?: { asset: { url: string } };
	slug?: { current: string };
}

interface SearchResult {
	_id: string;
	title: string;
	slug: { current: string };
	shortDescription?: string;
	author: Author;
}

interface SearchBarProps {
	isOpen: boolean;
	onClose: () => void;
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
	const [query, setQuery] = useState("");
	const [authors, setAuthors] = useState<Author[]>([]);
	const [posts, setPosts] = useState<SearchResult[]>([]);
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
				setAuthors(data.authors);
				setPosts(data.posts);
			}
		} catch (err) {
			setError("Failed to fetch search results.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Suspense fallback={null}>
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent
					side='top'
					className='max-h-screen p-2 overflow-y-auto font-inconsolata md:p-4'>
					<SheetHeader className='w-[94%] md:w-[90%] mx-auto'>
						<SheetTitle className='flex flex-col items-center justify-center gap-4 w-[100%] md:w-[80%] mx-auto'>
							<div className='relative flex items-center w-full gap-2 md:gap-4'>
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
										onKeyDown={(
											e,
										) => {
											if (
												e.key ===
												"Enter"
											) {
												e.preventDefault();
												handleSearch();
											}
										}}
										placeholder='Search...'
										className='w-full p-1.5 px-6 border-2 border-pry focus:outline-none'
									/>
									<button
										onClick={
											handleSearch
										}
										disabled={
											loading
										}
										className='absolute text-gray-900 transform -translate-y-1/2 rounded-lg right-2 top-1/2 hover:bg-slate-300 bg-gray-900/10 animate'>
										<CiSearch className='w-8 h-8 space-x-6' />
									</button>
								</div>

								<SheetClose>
									<TfiClose className='cursor-pointer h-7 w-7 animate' />
								</SheetClose>
							</div>

							<div className='w-full px-2 mt-4 text-base md:text-lg'>
								{loading && (
									<p>
										Loading...
									</p>
								)}
								{error && (
									<p className='text-red-500'>
										{
											error
										}
									</p>
								)}

								<div className='max-h-[400px] overflow-y-auto scrollBar'>
									{/* Render Authors */}
									{authors.length >
										0 && (
										<div className='mt-4'>
											<h2 className='text-lg font-bold'>
												Authors
											</h2>
											<div className='flex flex-wrap gap-4 mt-2'>
												{authors.map(
													(
														author,
													) => (
														<div
															key={
																author._id
															}
															className='flex items-center gap-2'>
															{author
																.image
																?.asset
																.url && (
																<Image
																	src={
																		author
																			.image
																			.asset
																			.url
																	}
																	alt={
																		author.name
																	}
																	className='w-8 h-8 rounded-full'
																	width={
																		48
																	}
																	height={
																		48
																	}
																/>
															)}
															<Link
																href={`/author/${author.slug?.current}`}
																onClick={
																	onClose
																}>
																<span className='underline text-sec hover:text-pry'>
																	{
																		author.name
																	}
																</span>
															</Link>
														</div>
													),
												)}
											</div>
										</div>
									)}

									{/* Render Posts */}
									{posts.length >
										0 && (
										<div className='mt-4'>
											<h2 className='text-lg font-bold'>
												Posts
											</h2>
											<ul className='mt-2 list-none'>
												{posts.map(
													(
														post,
													) => (
														<li
															key={
																post._id
															}
															className='mb-4'>
															<Link
																href={`/post/${post.slug.current}`}
																onClick={
																	onClose
																}>
																<p className='font-medium hover:underline'>
																	{
																		post.title
																	}
																</p>
															</Link>
														</li>
													),
												)}
											</ul>
										</div>
									)}
								</div>

								{/* Render Related Results */}
								{relatedResults.length >
									0 && (
									<div className='mt-4'>
										<h2 className='text-lg font-bold'>
											Related
											Results
										</h2>
										<ul className='mt-2 list-none'>
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
															href={`/post/${result.slug.current}`}>
															<p
																className='font-medium hover:underline'
																onClick={
																	onClose
																}>
																{
																	result.title
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
										<p className='mt-4 text-gray-600'>
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
		</Suspense>
	);
};

export default SearchBar;
