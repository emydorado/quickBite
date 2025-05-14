import { useEffect, useState } from 'react';
import NavMenu from '../../components/navMenu/navMenu';
import BigCardDish from '../../components/bigCardDish/bigCardDish';
import CategorieButton from '../../components/categorieButton/categorieButton';
import IngredientButton from '../../components/ingredientButton/ingredientButton';
import { fetchIngredients, fetchCategories, fetchRecipes, fetchRecipesByCategory } from '../../services/firebaseUtils';
import './search.css';

function Search() {
	const [search, setSearch] = useState('');
	const [searchIngredient, setSearchIngredient] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const [categories, setCategories] = useState([]);
	const [recipes, setRecipes] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);

	useEffect(() => {
		const loadIngredients = async () => {
			const ingredientsData = await fetchIngredients();
			setIngredients(ingredientsData);
		};
		loadIngredients();
	}, []);

	useEffect(() => {
		const loadCategories = async () => {
			const categoriesData = await fetchCategories();
			setCategories(categoriesData);
		};
		loadCategories();
	}, []);

	useEffect(() => {
		const loadRecipes = async () => {
			const recipesData = await fetchRecipes();
			setRecipes(recipesData);
		};
		loadRecipes();
	}, []);

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
		setSearchIngredient(event.target.value);
		setSelectedCategory(null); // quitar categoría activa si se hace búsqueda manual
	};

	const handleCategoryClick = async (category) => {
		if (category === selectedCategory) {
			// Si se vuelve a hacer clic, deselecciona
			setSelectedCategory(null);
			const allRecipes = await fetchRecipes();
			setRecipes(allRecipes);
		} else {
			setSelectedCategory(category);
			const filteredByCategory = await fetchRecipesByCategory(category);
			setRecipes(filteredByCategory);
			setSearch(''); // borra búsqueda manual si hay selección por categoría
		}
	};

	const filteredRecipes = search
		? recipes.filter((recipe) => recipe.recipe_name?.toLowerCase().includes(search.toLowerCase()))
		: recipes;

	const filteredIngredients = ingredients.filter((ingredient) =>
		ingredient.name?.toLowerCase().includes(searchIngredient.toLowerCase())
	);

	return (
		<>
			<NavMenu />

			<div id='search-container'>
				<div className='top-section'>
					<h1 className='search-title'>Search for recipes</h1>

					<input
						type='text'
						placeholder="What's in your fridge?..."
						className='search-input'
						value={search}
						onChange={handleSearchChange}
					/>

					<div id='filters'>
						<section className='container-categories'>
							{categories.map((category) => (
								<CategorieButton
									key={category.id}
									emoji={category.emoji}
									categorie={category.name}
									onClick={handleCategoryClick}
									isActive={selectedCategory === category.name}
								/>
							))}
						</section>

						<section className='container-ingredients'>
							{searchIngredient &&
								filteredIngredients.map((ingredient) => (
									<IngredientButton key={ingredient.id} name={ingredient.name} emoji={ingredient.emoji} />
								))}
						</section>
					</div>
				</div>

				<section className='results'>
					{filteredRecipes.map((recipe) => (
						<BigCardDish
							key={recipe.id}
							id={recipe.id}
							img={recipe.img}
							title={recipe.recipe_name}
							time={recipe.prep_time_minutes}
						/>
					))}
				</section>
			</div>
		</>
	);
}

export default Search;
