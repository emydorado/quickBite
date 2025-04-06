import './bigCardDish.css';

const BigCardDish = ({ img, title, time }) => {
	return (
		<div id='card'>
			<img src={img} alt='dish picture' />
			<div className='textContent'>
				<h1 className='title'>{title} </h1>
				<p className='time'>{time}</p>
			</div>
		</div>
	);
};

export default BigCardDish;
