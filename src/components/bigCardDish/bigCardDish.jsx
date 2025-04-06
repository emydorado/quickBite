import './bigCardDish.css';

const BigCardDish = ({ img, title, time }) => {
	return (
		<div className='card'>
			<img src={img} alt='dish picture' />
			<div className='textContent'>
				<h1 class='title'>{title} </h1>
				<p class='time'>{time}</p>
			</div>
		</div>
	);
};

export default BigCardDish;
