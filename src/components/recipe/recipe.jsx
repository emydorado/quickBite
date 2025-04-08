import { useEffect } from 'react';
import CheckButton from '../checkButton/checkButton';
import './recipe.css';

const RecipeComponent = ({ img, title, time, ingredients, steps }) => {
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
						<div className='recipe-checkbutton'>
							<CheckButton></CheckButton>
						</div>
					</div>
					<div className='check-button'>
						<p className='recipe-time'>{time} minutes</p>
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
					{Object.entries(steps).map(([value], index) => (
						<li className='recipe-steps-numbers' key={index}>
							<p className='recipe-steps-description'>{steps[value]}</p>
						</li>
					))}
				</ol>
			</section>
		</div>
	);
};

export default RecipeComponent;
