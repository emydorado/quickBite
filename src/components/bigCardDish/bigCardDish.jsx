import './bigCardDish.css';

const BigCardDish = ({ img, title, time }) => {
	return (
		<div className='big-card'>
			<img src={img} alt='dish picture' />
			<div className='onlyText'>
				<h1 className='big-card-title'>{title} </h1>
				<p className='big-card-time'>{time}</p>
			</div>
		</div>
	);
};

export default BigCardDish;
