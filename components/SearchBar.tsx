import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetClose,
} from "@/components/ui/sheet";
import { CiSearch } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
interface SearchBarProps {
	isOpen: boolean;
	onClose: () => void;
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent
				side='top'
				className='p-3 font-inconsolata md:p-4'>
				<SheetHeader className='w-[94%] md:w-[90%] mx-auto p'>
					<SheetTitle className='flex items-center justify-between gap-4 w-[100%] md:w-[80%] mx-auto px-1 '>
						<div className='relative w-full'>
							<button>
								<CiSearch className='absolute w-6 h-6 text-gray-500 transform -translate-y-1/2 right-3 top-1/2' />
							</button>

							<input
								type='text'
								name=''
								placeholder='Search...'
								className='w-full p-2 border-2 border-black focus:outline-none'
							/>
						</div>

						<SheetClose>
							<TfiClose className='cursor-pointer h-7 w-7' />
						</SheetClose>
					</SheetTitle>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default SearchBar;
