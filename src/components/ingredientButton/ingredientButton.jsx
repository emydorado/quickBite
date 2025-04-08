import './ingredientButton.css';

const IngredientButton = ({ emoji, name }) => {
	return (
		<div id='ingredientContainer'>
			<h1 className='ingredient-emoji'>{emoji}</h1>
			<h1 className='ingredientName'>{name} </h1>
			<button className='deleteButton'>
				<svg xmlns='http://www.w3.org/2000/svg' width='5vw' height='5vw' viewBox='0 0 24 24' className='x-icon'>
					<path d='m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z'></path>
				</svg>
			</button>
		</div>
	);
};

export default IngredientButton;
