import './ingredientButton.css';

const IngredientButton = ({ emoji, name }) => {
	return (
		<div id='ingredientContainer'>
			<h1 className='emoji'>{emoji}</h1>
			<h1 className='ingredientName'>{name} </h1>
			<button className='deleteButton'>x</button>
		</div>
	);
};

export default IngredientButton;
