import HeroLeft from "./HeroLeft";
import HeroMid from "./HeroMid";
import HeroRight from "./HeroRight";

const HeroMain = () => {
	return (
		<div className='flex flex-col md:flex-row gap-4'>
			<div className='md:w-[22%]'>
				<HeroLeft />
			</div>
			<div className='md:w-[56%]'>
				<HeroMid />
			</div>
			<div className='md:w-[22%]'>
				<HeroRight />
			</div>
		</div>
	);
};

export default HeroMain;
