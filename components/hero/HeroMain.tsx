import HeroLeft from "./HeroLeft";
import HeroMid from "./HeroMid";
import HeroRight from "./HeroRight";

const HeroMain = () => {
	return (
		<div className='flex flex-col gap-4 md:flex-row'>
			<div className='order-1 md:order-2 md:w-[50%]'>
				<HeroMid />
			</div>

			<div className='order-2 md:order-1 md:w-[25%]'>
				<HeroLeft />
			</div>

			<div className='order-3 md:order-3 md:w-[25%]'>
				<HeroRight />
			</div>
		</div>
	);
};

export default HeroMain;
