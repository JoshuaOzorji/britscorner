"use client";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import logo from "@/public/logo.png";
import { CiSearch } from "react-icons/ci";
import { navItems } from "@/lib/data";
import { TfiClose } from "react-icons/tfi";
import { useState } from "react";

interface MobileNavProps {
	isSearchOpen: boolean;
	onToggleSearch: () => void;
}

const MobileNav = ({ onToggleSearch }: MobileNavProps) => {
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const closeSheet = () => {
		setIsSheetOpen(false);
	};

	return (
		<div className='flex items-center justify-between p-2 border-b font-inconsolata'>
			{/* MENU LINK */}
			<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
				<SheetTrigger>
					<CiMenuBurger className='w-6 h-6' />
				</SheetTrigger>

				<SheetContent side='left'>
					<SheetHeader>
						<SheetClose className='flex items-end ml-auto'>
							<TfiClose className='w-6 h-6 ' />
						</SheetClose>
						<SheetTitle></SheetTitle>
						<div>
							<ul className='flex flex-col gap-4 text-2xl sm:text-4xl'>
								{navItems.map(
									(
										item,
										index,
									) => (
										<li
											key={
												index
											}>
											<Link
												href={`/category/${item.toLowerCase()}`}
												onClick={
													closeSheet
												}>
												<span className='text-sec hover:text-black animate'>
													{
														item
													}
												</span>
											</Link>
										</li>
									),
								)}
							</ul>
						</div>
					</SheetHeader>
				</SheetContent>
			</Sheet>

			{/* LOGO */}
			<Link href='/'>
				<Image src={logo} alt='logo' />
			</Link>

			{/* SEARCH ICON */}
			<button onClick={onToggleSearch}>
				<CiSearch className='w-7 h-7' />
			</button>
		</div>
	);
};

export default MobileNav;
