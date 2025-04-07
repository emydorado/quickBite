import './checklistCardDish.css';
import CheckButton from '../checkButton/checkButton';

const ChecklistCardDish = ({ img, title, time }) => {
	return (
		<div id='checklistCard'>
			<img src={img} alt='dish picture' />
			<div className='onlyTextChecklist'>
				<h1 className='title'>{title} </h1>
				<p className='time'>{time}</p>
				<p className='description'>descripcion corta del plato</p>
			</div>
			<div id='checklist'>
				<CheckButton />
			</div>
		</div>
	);
};

export default ChecklistCardDish;
