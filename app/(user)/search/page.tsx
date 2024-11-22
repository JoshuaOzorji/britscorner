"use client";

import { useState } from "react";

export default function TestSearch() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<any[]>([]);
	const [error, setError] = useState("");

	const handleSearch = async () => {
		setError(""); // Clear any previous error
		try {
			const res = await fetch(
				`/api/search?query=${encodeURIComponent(query)}`,
			);
			if (!res.ok) {
				throw new Error(`Error: ${res.status}`);
			}
			const data = await res.json();
			setResults(data);
		} catch (err) {
			setError("Failed to fetch search results.");
			console.error(err);
		}
	};

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold mb-4'>Test Search</h1>
			<div className='flex gap-2 mb-4'>
				<input
					type='text'
					value={query}
					onChange={(e) =>
						setQuery(e.target.value)
					}
					placeholder='Enter your search query'
					className='border p-2 w-full'
				/>
				<button
					onClick={handleSearch}
					className='bg-blue-500 text-white px-4 py-2'>
					Search
				</button>
			</div>
			{error && <p className='text-red-500'>{error}</p>}
			<div>
				<h2 className='text-xl font-semibold'>
					Results:
				</h2>
				<ul className='mt-2'>
					{results.map((result) => (
						<li
							key={result._id}
							className='mb-2'>
							<p className='font-medium'>
								{result.title}
							</p>
							<p className='text-sm text-gray-600'>
								{
									result.shortDescription
								}
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
