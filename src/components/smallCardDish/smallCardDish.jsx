import SavedIcon from '../savedIcon/savedIcon';
import './smallCardDish.css';
import { useNavigate } from 'react-router-dom';

const SmallCardDish = ({ id, img, title, time }) => {
	const navigate = useNavigate();

	return (
		<div id='smallCard'>
			<img src={img} alt='dish picture' className='home-image' onClick={() => navigate(`/recipe/${id}`)} />

			<div className='text-icon'>
				<div className='onlyText' onClick={() => navigate(`/recipe/${id}`)}>
					<h1 className='small-card-title'>{title} </h1>
					<p className='small-card-time'>{time} minutes</p>
				</div>
				<div id='icon'>
					<SavedIcon recipeId={id} />
				</div>
			</div>
		</div>
	);
};

export default SmallCardDish;
