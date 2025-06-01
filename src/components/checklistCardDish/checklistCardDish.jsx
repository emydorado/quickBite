import { useNavigate } from 'react-router-dom';
import CheckButton from '../checkButton/checkButton';
import './checklistCardDish.css';

const ChecklistCardDish = ({ id, img, title, time, description }) => {
	const navigate = useNavigate();

	const handleNavigate = () => navigate(`/recipe/${id}`);
	return (
		<div id='checklistCard' onClick={handleNavigate} role='button' aria-label={`Ver receta de ${title}`}>
			<img src={img} alt='dish picture' />
			<div className='onlyTextChecklist'>
				<p className='checklist-title'>{title} </p>
				<p className='time'>{time} minutes</p>
				<p className='checklistDescription'>{description}</p>
			</div>
			<div id='checklist'>
				<CheckButton recipeId={id} />
			</div>
		</div>
	);
};

export default ChecklistCardDish;
