import Header from "@/components/Header";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main>
			<Header />
			<div className='mx-4 my-2 md:my-6 md:mx-10'>
				{children}
			</div>
		</main>
	);
};

export default BaseLayout;
