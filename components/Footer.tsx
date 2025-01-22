"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

const Footer = () => {
	const [currentYear, setCurrentYear] = useState(
		new Date().getFullYear(),
	);

	useEffect(() => {
		setCurrentYear(new Date().getFullYear());
	}, []);

	return (
		<Suspense fallback={null}>
			<main className='pt-2 pb-1 border-t font-josefin text-sec'>
				<div className='w-[94%] mx-auto text-center'>
					<p className='text-sm font-semibold md:text-base'>
						&copy;{currentYear}{" "}
						<Link href='/'>
							BlitsCorner
						</Link>
					</p>

					<div className='flex items-center justify-center gap-4 text-xs md:text-sm'>
						<Link href='/privacy-policy'>
							<span className='hover:underline hover:text-pry'>
								Privacy Policy
							</span>
						</Link>

						<Link href='/about-us'>
							<span className='hover:underline hover:text-pry'>
								About us
							</span>
						</Link>
					</div>
				</div>
			</main>
		</Suspense>
	);
};

export default Footer;
