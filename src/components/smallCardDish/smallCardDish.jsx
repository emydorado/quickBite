import './smallCardDish.css';

const SmallCardDish = ({ img, title, time }) => {
	return (
		<div id='smallCard'>
			<img src={img} alt='dish picture' className='home-image' />
			<div className='onlyText'>
				<h1 className='small-card-title'>{title} </h1>
				<p className='small-card-time'>{time}</p>
			</div>
		</div>
	);
};

export default SmallCardDish;
