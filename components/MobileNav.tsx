"use client";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
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

interface MobileNavProps {
	isSearchOpen: boolean;
	onToggleSearch: () => void;
}

const MobileNav = ({ onToggleSearch }: MobileNavProps) => {
	return (
		<div className='flex items-center justify-between p-2 font-inconsolata border-b'>
			{/* MENU LINK */}
			<Sheet>
				<SheetTrigger>
					<CiMenuBurger className='w-6 h-6' />
				</SheetTrigger>

				<SheetContent side='left'>
					<SheetHeader>
						<SheetClose className='flex items-end ml-auto'>
							<TfiClose className='w-6 h-6 ' />
						</SheetClose>
						<SheetTitle></SheetTitle>
						<SheetDescription className=''>
							<ul className='flex flex-col gap-4 text-2xl sm:text-4xl font-inconsolata'>
								{navItems.map(
									(
										item,
										index,
									) => (
										<li
											key={
												index
											}>
											<button>
												{
													item
												}
											</button>
										</li>
									),
								)}
							</ul>
						</SheetDescription>
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
