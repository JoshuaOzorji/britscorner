import Header from "@/components/Header";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Header />
			<main className='mx-4 my-2 md:my-6 md:mx-10'>
				{children}
			</main>
		</div>
	);
};

export default BaseLayout;
