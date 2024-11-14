import HeroMain from "@/components/hero/HeroMain";
import Header from "../components/Header";

const page = () => {
	return (
		<div>
			<Header />
			<div className='mx-4 my-2 md:my-6 md:mx-10'>
				<HeroMain />
			</div>
		</div>
	);
};

export default page;
