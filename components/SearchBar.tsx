import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from "@/components/ui/dialog";
import { TfiClose } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
	isOpen: boolean;
	onClose: () => void;
}

const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='top-0 left-0 max-w-full mx-auto translate-x-0 translate-y-0 rounded-none font-inconsolata'>
				<DialogHeader className='w-[90%] mx-auto'>
					<DialogTitle className='flex items-center justify-between gap-4'>
						<div className='relative w-full'>
							<button>
								<CiSearch className='absolute w-6 h-6 text-gray-500 transform -translate-y-1/2 right-3 top-1/2' />
							</button>
							<input
								type='text'
								name=''
								placeholder='Search...'
								className='w-full p-2 border focus:outline-none'
							/>
						</div>

						<DialogClose asChild>
							<button>
								<TfiClose className='h-7 w-7' />
							</button>
						</DialogClose>
					</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default SearchBar;
