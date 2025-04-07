import './bigCardDish.css';

const BigCardDish = ({ img, title, time }) => {
	return (
		<div id='card'>
			<img src={img} alt='dish picture' />
			<div className='onlyText'>
				<h1 className='bigcard-title'>{title} </h1>
				<p className='bid-card-time'>{time}</p>
			</div>
		</div>
	);
};

export default BigCardDish;
