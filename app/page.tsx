import HeroMain from "@/components/hero/HeroMain";
import Header from "../components/Header";

const page = () => {
	return (
		<div>
			<Header />
			<div className='mx-10 my-6'>
				<HeroMain />
			</div>
		</div>
	);
};

export default page;
