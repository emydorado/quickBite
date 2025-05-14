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
	const [selectedIngredients, setSelectedIngredients] = useState([]);

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
		setSelectedCategory(null);
	};

	const handleCategoryClick = async (category) => {
		if (category === selectedCategory) {
			setSelectedCategory(null);
			const allRecipes = await fetchRecipes();
			setRecipes(allRecipes);
		} else {
			setSelectedCategory(category);
			const filteredByCategory = await fetchRecipesByCategory(category);
			setRecipes(filteredByCategory);
			setSearch('');
		}
	};

	const handleIngredientToggle = (ingredient) => {
		const alreadySelected = selectedIngredients.some((i) => i.id === ingredient.id);
		if (alreadySelected) {
			setSelectedIngredients((prev) => prev.filter((i) => i.id !== ingredient.id));
		} else {
			setSelectedIngredients((prev) => [...prev, ingredient]);
		}
	};

	const filteredIngredients = [
		...selectedIngredients,
		...ingredients.filter(
			(ingredient) =>
				ingredient.name?.toLowerCase().includes(searchIngredient.toLowerCase()) &&
				!selectedIngredients.some((i) => i.id === ingredient.id)
		),
	];

	const filteredRecipes = recipes.filter((recipe) => {
		const matchesSearch = search ? recipe.recipe_name?.toLowerCase().includes(search.toLowerCase()) : true;

		const matchesIngredients =
			selectedIngredients.length > 0
				? selectedIngredients.every((selectedIng) =>
						recipe.ingredients?.some((ing) => ing.name.toLowerCase() === selectedIng.name.toLowerCase())
				  )
				: true;

		return matchesSearch && matchesIngredients;
	});

	return (
		<>
			<NavMenu />

			<div id='search-container'>
				<div className='top-section'>
					<h1 className='search-title'>Search for recipes</h1>

					<input
						type='text'
						placeholder="What's in your fridge?... "
						className='search-input'
						value={search}
						onChange={handleSearchChange}
					/>

					{}
					<section className='container-ingredients'>
						{filteredIngredients.map((ingredient) => (
							<IngredientButton
								key={ingredient.id}
								name={ingredient.name}
								emoji={ingredient.emoji}
								isSelected={selectedIngredients.some((i) => i.id === ingredient.id)}
								onToggle={() => handleIngredientToggle(ingredient)}
							/>
						))}
					</section>

					{}
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
				</div>

				{}
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
