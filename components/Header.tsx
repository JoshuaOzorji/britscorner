"use client";

import { Suspense, useState } from "react";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import SearchBar from "./SearchBar";

const Header = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const toggleSearchBar = () => {
		setIsSearchOpen((prev) => !prev);
	};

	return (
		<Suspense fallback={null}>
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
				<Suspense>
					{isSearchOpen && (
						<SearchBar
							isOpen={isSearchOpen}
							onClose={
								toggleSearchBar
							}
						/>
					)}
				</Suspense>
			</main>
		</Suspense>
	);
};

export default Header;
