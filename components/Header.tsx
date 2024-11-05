"use client";

import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Header = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const toggleSearchBar = () => {
		setIsSearchOpen((prev) => !prev);
	};

	return (
		<nav className='w-[90%] mx-auto p-4'>
			<div className='flex items-center justify-between'>
				<Link href='/'>
					<Image src={logo} alt='logo' />
				</Link>

				<div className='flex items-center gap-5'>
					<ul className='flex gap-4 text-xl font-inconsolata'>
						<li>News</li>
						<li>Compilations</li>
						<li>Fonts</li>
						<li>Development</li>
						<li>AI</li>
					</ul>

					<div
						className='flex items-center cursor-pointer'
						onClick={toggleSearchBar}>
						<CiSearch className='w-7 h-7' />
					</div>
				</div>
			</div>
			{isSearchOpen && (
				<SearchBar
					isOpen={isSearchOpen}
					onClose={toggleSearchBar}
				/>
			)}
		</nav>
	);
};

export default Header;
