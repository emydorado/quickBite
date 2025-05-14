function CategorieButton({ emoji, categorie, onClick }) {
	return (
		<button onClick={() => onClick(categorie)} className='categorie-button'>
			<span>{emoji}</span> {categorie}
		</button>
	);
}

export default CategorieButton;
