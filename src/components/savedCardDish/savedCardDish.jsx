import '../savedCardDish/savedCardDish.css';
import SavedIcon from '../savedIcon/savedIcon';

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
					<SavedIcon />
				</div>
			</div>
		</div>
	);
};

export default SavedCardDish;
