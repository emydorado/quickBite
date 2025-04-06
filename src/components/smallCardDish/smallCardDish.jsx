import './smallCardDish.css';

const SmallCardDish = ({ img, title, time }) => {
	return (
		<div id='smallCard'>
			<img src={img} alt='dish picture' />
			<div className='onlyText'>
				<h1 className='title'>{title} </h1>
				<p className='time'>{time}</p>
			</div>
		</div>
	);
};

export default SmallCardDish;
