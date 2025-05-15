import PropTypes from 'prop-types';
import SavedIcon from '../savedIcon/savedIcon';
import './bigCardDish.css';
import { useNavigate } from 'react-router-dom';

const BigCardDish = ({ img, title, time, id }) => {
	const navigate = useNavigate();

	const handleNavigate = () => navigate(`/recipe/${id}`);

	return (
		<div
			className='big-card'
			tabIndex={0}
			role='button'
			onClick={handleNavigate}
			onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && handleNavigate()}
			aria-label={`Ver receta de ${title}`}
		>
			<img
				src={img}
				alt={`Imagen del platillo ${title}`}
				loading='lazy'
				className='big-card-img'
				onClick={(e) => {
					e.stopPropagation();
					handleNavigate();
				}}
			/>
			<div className='text-icon-big'>
				<div className='onlyText-big'>
					<h1 className='big-card-title'>{title}</h1>
					<p className='big-card-time'>{time} minutos</p>
				</div>
				<SavedIcon recipeId={id} />
			</div>
		</div>
	);
};

BigCardDish.propTypes = {
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BigCardDish;
