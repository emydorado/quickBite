import './categorieButton.css';

function CategorieButton({ emoji, categorie, onClick, isActive }) {
	return (
		<button onClick={() => onClick(categorie)} className={`categorie-button ${isActive ? 'active' : ''}`}>
			<span>{emoji}</span> {categorie}
		</button>
	);
}

export default CategorieButton;
