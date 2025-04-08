import './bigCardDish.css';
import { useNavigate } from 'react-router-dom';

const BigCardDish = ({ img, title, time, id }) => {
	const navigate = useNavigate();

	return (
		<div className='big-card' onClick={() => navigate(`/recipe/${id}`)}>
			<img src={img} alt='dish picture' />
			<div className='onlyText'>
				<h1 className='big-card-title'>{title} </h1>
				<p className='big-card-time'>{time} minutes</p>
			</div>
		</div>
	);
};

export default BigCardDish;
