import './ingredientButton.css';

const IngredientButton = ({ emoji, name, isSelected, onToggle }) => {
	return (
		<div className={`ingredient-button ${isSelected ? 'selected' : ''}`} onClick={onToggle}>
			<span className='ingredient-emoji'>{emoji}</span>
			<span className='ingredient-name'>{name}</span>
		</div>
	);
};

export default IngredientButton;
