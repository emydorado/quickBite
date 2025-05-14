import { useEffect, useState } from 'react';
import NavMenu from '../../components/navMenu/navMenu';
import BigCardDish from '../../components/bigCardDish/bigCardDish';
import CategorieButton from '../../components/categorieButton/categorieButton';
import IngredientButton from '../../components/ingredientButton/ingredientButton';
import { fetchIngredients, fetchCategories, fetchRecipes } from '../../services/firebaseUtils';
import './search.css';

function Search() {
	const [search, setSearch] = useState('');
	const [searchIngredient, setSearchIngredient] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const [categories, setCategories] = useState([]);
	const [recipes, setRecipes] = useState([]);

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
	};

	const filteredRecipes = recipes.filter((recipe) => recipe.recipe_name?.toLowerCase().includes(search.toLowerCase()));

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
								<CategorieButton key={category.id} emoji={category.emoji} categorie={category.name} />
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
					{search &&
						filteredRecipes.map((recipe) => (
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
