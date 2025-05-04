import '../savedCardDish/savedCardDish.css';
import SavedIcon from '../savedIcon/savedIcon';

const SavedCardDish = ({ id, img, title, time }) => {
	return (
		<div id='savedCard'>
			<img src={img} alt='dish picture' className='saved-image' />
			<div className='textContent'>
				<div className='onlyText'>
					<h1 className='saved-card-title'>{title} </h1>
					<p className='saved-card-time'>{time} minutes</p>
				</div>
				<div id='icon'>
					<SavedIcon recipeId={id} />
				</div>
			</div>
		</div>
	);
};

export default SavedCardDish;
