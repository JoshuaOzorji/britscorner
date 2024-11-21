"use client";

import Link from "next/link";
import logo from "@/public/logo.png";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { navItems } from "@/lib/data";

interface MainNavProps {
	isSearchOpen: boolean;
	onToggleSearch: () => void;
}

const MainNav = ({ onToggleSearch }: MainNavProps) => {
	return (
		<nav className='border-b font-inconsolata font-bold'>
			<div className='flex items-center justify-between w-[90%] mx-auto p-4'>
				<Link href='/'>
					<Image src={logo} alt='logo' />
				</Link>

				<div className='flex items-center gap-5'>
					<ul className='flex gap-4 text-xl'>
						{navItems.map((item, index) => (
							<li key={index}>
								<Link
									href={`/category/${item.toLowerCase()}`}>
									{item}
								</Link>
							</li>
						))}
					</ul>

					<div
						className='flex items-center cursor-pointer'
						onClick={onToggleSearch}>
						<CiSearch className='w-7 h-7' />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default MainNav;
