import SavedIcon from '../savedIcon/savedIcon';
import './bigCardDish.css';
import { useNavigate } from 'react-router-dom';

const BigCardDish = ({ img, title, time, id }) => {
	const navigate = useNavigate();

	return (
		<div className='big-card'>
			<img src={img} alt='dish picture' onClick={() => navigate(`/recipe/${id}`)} />
			<div className='text-icon-big'>
				<div className='onlyText-big' onClick={() => navigate(`/recipe/${id}`)}>
					<h1 className='big-card-title'>{title} </h1>
					<p className='big-card-time'>{time} minutes</p>
				</div>
				<SavedIcon recipeId={id} />
			</div>
		</div>
	);
};

export default BigCardDish;
