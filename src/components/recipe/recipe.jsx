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
					<div className="recipe-ingredients-container">
						<h2 className='titulo-ingredientes'>Ingredients</h2>
						<ol id='ingredients'>
							{ingredients.map((ing, index) => (
								<li key={index}>
									{ing.quantity} {ing.unit} {ing.name}
								</li>
							))}
						</ol>
					</div>

					<div className="recipe-steps-container">
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
