import './ingredientButton/ingredientButton.css';

const CategorieButton = ({ emoji, categorie }) => {
	return (
		<div id='ingredientContainer'>
			<h1 className='ingredient-emoji'>{emoji}</h1>
			<h1 className='ingredientName'>{categorie} </h1>
		</div>
	);
};

export default CategorieButton;
