import { useEffect } from 'react';
import CheckButton from '../checkButton/checkButton';
import './recipe.css';

const RecipeComponent = ({ img, title, time, ingredients, step, description }) => {
	useEffect(() => {
		document.body.classList.add('recipe-body');

		return () => {
			document.body.classList.remove('recipe-body');
		};
	}, []);

	return (
		<div id='recipe-page'>
			<img src={img} alt='dish picture' className='banner-image' />

			<section id='recipe-content'>
				<div id='top-section'>
					<div className='top-text'>
						<h1 className='recipe-title'>{title} </h1>
					</div>
					<div className='check-button'>
						<p className='recipe-time'>{time}</p>

						<CheckButton></CheckButton>
					</div>
				</div>
				<h2 className='titulo-ingredientes'>Ingredients</h2>

				<ol id='ingredients'>
					{ingredients.map((ing, index) => (
						<li key={index}>
							{ing.quantity} {ing.unit} {ing.name}
						</li>
					))}
				</ol>
				<h2 className='titulo-ingredientes'>Steps</h2>
				<ol id='steps'>
					<li>
						<h3>{step}</h3>
						<p>{description}</p>
					</li>
				</ol>
			</section>
		</div>
	);
};

export default RecipeComponent;
