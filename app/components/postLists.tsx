import Link from "next/link";
import { defineQuery } from "next-sanity";

import { client } from "@/sanity/lib/client";

const options = { next: { revalidate: 60 } };

const POSTS_QUERY = defineQuery(`*[
  _type == "event"
  && defined(slug.current)
]{_id, name, slug, date}|order(date desc)`);

interface Event {
	_id: string;
	name: string;
	slug: { current: string };
	date: string;
}

export default async function IndexPage() {
	const posts: Event[] = await client.fetch(POSTS_QUERY, {}, options);

	console.log(posts);
	return (
		<main className='flex bg-gray-100 min-h-screen flex-col p-24 gap-12'>
			<h1 className='text-4xl font-bold tracking-tighter'>
				Events
			</h1>
			<ul className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
				{posts.map((event) => (
					<li
						className='bg-white p-4 rounded-lg'
						key={event._id}>
						<Link
							className='hover:underline'
							href={`/events/${event?.slug?.current}`}>
							<h2 className='text-xl font-semibold'>
								{event?.name}
							</h2>
							{event?.date && (
								<p className='text-gray-500'>
									{new Date(
										event.date,
									).toLocaleDateString()}
								</p>
							)}
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
