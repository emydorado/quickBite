import { useEffect } from 'react';
import CheckButton from '../checkButton/checkButton';
import './recipe.css';
import { useNavigate } from 'react-router-dom';

const RecipeComponent = ({ img, title, time, ingredients, steps }) => {
	const navigate = useNavigate();

	useEffect(() => {
		document.body.classList.add('recipe-body');
		return () => {
			document.body.classList.remove('recipe-body');
		};
	}, []);

	return (
		<div id='recipe-page'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='28'
				height='28'
				viewBox='0 0 320 512'
				style={{ fill: '#3A5322' }}
				className='go-back-icon'
				onClick={() => navigate(-1)}
			>
				<path d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z' />
			</svg>

			<img src={img} alt='Dish' className='banner-image' />

			<section id='recipe-content'>
				<div id='top-section'>
					<div className='top-text'>
						<h1 className='recipe-title'>{title}</h1>
						<div className='recipe-checkbutton'>
							<CheckButton />
						</div>
					</div>
					<p className='recipe-time'>{time} minutes</p>
				</div>

				<div className='recipe-steps-ingredients'>
					<div className='recipe-ingredients-container'>
						<h2 className='titulo-ingredientes'>Ingredients</h2>
						<ol id='ingredients'>
							{ingredients.map((ing, index) => (
								<li key={index}>
									{ing.quantity} {ing.unit} {ing.name}
								</li>
							))}
						</ol>
					</div>

					<div className='recipe-steps-container'>
						<h2 className='titulo-ingredientes'>Steps</h2>
						<ol id='steps'>
							{Object.entries(steps).map(([, step], index) => (
								<li className='recipe-steps-numbers' key={index}>
									<p className='recipe-steps-description'>{step}</p>
								</li>
							))}
						</ol>
					</div>
				</div>
			</section>
		</div>
	);
};

export default RecipeComponent;
