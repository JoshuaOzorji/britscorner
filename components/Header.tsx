"use client";

import { useState } from "react";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import SearchBar from "./SearchBar";

const Header = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const toggleSearchBar = () => {
		setIsSearchOpen((prev) => !prev);
	};

	return (
		<main>
			<div className='md:hidden'>
				<MobileNav
					isSearchOpen={isSearchOpen}
					onToggleSearch={toggleSearchBar}
				/>
			</div>
			<div className='hidden md:block'>
				<MainNav
					isSearchOpen={isSearchOpen}
					onToggleSearch={toggleSearchBar}
				/>
			</div>

			{isSearchOpen && (
				<SearchBar
					isOpen={isSearchOpen}
					onClose={toggleSearchBar}
				/>
			)}
		</main>
	);
};

export default Header;
