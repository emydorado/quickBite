import './checklistCardDish.css';
import CheckButton from '../checkButton/checkButton';

const ChecklistCardDish = ({ img, title, time, description }) => {
	return (
		<div id='checklistCard'>
			<img src={img} alt='dish picture' />
			<div className='onlyTextChecklist'>
				<p className='checklist-title'>{title} </p>
				<p className='time'>{time} minutes</p>
				<p className='checklistDescription'>{description}</p>
			</div>
			<div id='checklist'>
				<CheckButton />
			</div>
		</div>
	);
};

export default ChecklistCardDish;
