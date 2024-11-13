import HeroLeft from "./HeroLeft";
import HeroMid from "./HeroMid";
import HeroRight from "./HeroRight";

const HeroMain = () => {
	return (
		<div className='flex flex-col gap-4 md:flex-row'>
			<div className='md:w-[25%]'>
				<HeroLeft />
			</div>
			<div className='md:w-[50%]'>
				<HeroMid />
			</div>
			<div className='md:w-[25%]'>
				<HeroRight />
			</div>
		</div>
	);
};

export default HeroMain;
