import '../savedCardDish/savedCardDish.css';

const SavedCardDish = ({ img, title, time }) => {
	return (
		<div id='smallCard'>
			<img src={img} alt='dish picture' />
			<div className='textContent'>
				<div className='onlyText'>
					<h1 className='title'>{title} </h1>
					<p className='time'>{time}</p>
				</div>
				<div id='icon'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='5vw'
						height='5vw'
						viewBox='0 0 24 24'
						style={{ fill: '#6b6967' }}
					>
						<path d='M18 2H6c-1.103 0-2 .897-2 2v18l8-4.572L20 22V4c0-1.103-.897-2-2-2zm0 16.553-6-3.428-6 3.428V4h12v14.553z' />
					</svg>
				</div>
			</div>
		</div>
	);
};

export default SavedCardDish;
