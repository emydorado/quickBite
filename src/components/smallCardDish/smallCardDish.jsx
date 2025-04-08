import './smallCardDish.css';
import { useNavigate } from 'react-router-dom';

const SmallCardDish = ({ id, img, title, time }) => {
	const navigate = useNavigate();

	return (
		<div id='smallCard' onClick={() => navigate(`/recipe/${id}`)}>
			<img src={img} alt='dish picture' className='home-image' />
			<div className='onlyText'>
				<h1 className='small-card-title'>{title} </h1>
				<p className='small-card-time'>{time}</p>
			</div>
		</div>
	);
};

export default SmallCardDish;
