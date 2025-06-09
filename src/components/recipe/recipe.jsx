import { useEffect, useState } from 'react';
import CheckButton from '../checkButton/checkButton';
import { useNavigate } from 'react-router-dom';
import RecipeSaveIcon from '../recipeSaveIcon/RecipeSaveIcon';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './recipe.css';

const RecipeComponent = ({ id, img, title, time, ingredients, steps }) => {
	const navigate = useNavigate();
	const [servings, setServings] = useState(1);

	useEffect(() => {
		document.body.classList.add('recipe-body');
		return () => {
			document.body.classList.remove('recipe-body');
		};
	}, []);

	const scaledIngredients = ingredients.map((ingredient) => {
		const baseQuantity = parseFloat(ingredient.quantity);
		if (isNaN(baseQuantity)) return ingredient;
		const newQuantity = Math.round(baseQuantity * servings);
		return {
			...ingredient,
			quantity: newQuantity,
		};
	});

	const increment = () => {
		setServings((prev) => prev + 1);
	};

	const decrement = () => {
		setServings((prev) => (prev > 1 ? prev - 1 : 1)); // evita que baje de 1
	};

	return (
		<div id='recipe-page'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='28'
				height='28'
				viewBox='0 0 320 512'
				style={{ fill: '#fffdfc' }}
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
						<div className='recipe-buttons'>
							<div className='recipe-checkbutton'>
								<CheckButton recipeId={id} />
							</div>
							<div className='save-recipe-button'>
								<RecipeSaveIcon recipeId={id} />
							</div>
						</div>
					</div>

					<p className='recipe-time'>{time} minutes</p>

					<div className='servings-input-container'>
						<label htmlFor='servings'>How many servings do you need?</label>
						<div className='servings-input-container-btns'>
							<IconButton onClick={decrement}>
								<RemoveIcon sx={{ color: '#3a5322' }} />
							</IconButton>
							<input
								id='servings'
								type='number'
								min='1'
								value={servings}
								onChange={(e) => setServings(parseInt(e.target.value) || 1)}
							/>
							<IconButton onClick={increment}>
								<AddIcon sx={{ color: '#3a5322' }} />
							</IconButton>
						</div>
					</div>
				</div>

				<div className='recipe-steps-ingredients'>
					<div className='recipe-ingredients-container'>
						<h2 className='titulo-ingredientes'>Ingredients</h2>
						<ol id='ingredients'>
							{scaledIngredients.map((ing, index) => (
								<li key={index}>
									{ing.quantity} {ing.unit} of {ing.name}
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
