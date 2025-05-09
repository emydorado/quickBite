import NavMenu from '../../components/navMenu/navMenu';
import BigCardDish from '../../components/bigCardDish/bigCardDish';
import CategorieButton from '../../components/categorieButton';
import IngredientButton from '../../components/ingredientButton/ingredientButton';
import { useEffect, useState } from 'react';
import { db } from '../../services/firebaseConfig';
import './search.css';
import { getDocs, collection } from 'firebase/firestore';

function Search() {
	const [search, setSearch] = useState('');
	const [searchIngredient, setSearchIngredient] = useState('');
	const [ingredients, setIngredients] = useState([]);
	const [categories, setCategories] = useState([]);
	const [recipes, setRecipes] = useState([]);

	// fetch para traer ingredientes
	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'INGREDIENTS'));
				const fetchedIngredients = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setIngredients(fetchedIngredients);
			} catch (error) {
				console.error('Error fetching ingredients:', error);
			}
		};

		fetchIngredients();
	}, []);

	// fetch para traer categorías
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'CATEGORIES'));
				const fetchedCategories = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setCategories(fetchedCategories);
			} catch (error) {
				console.error('Error fetching ingredients:', error);
			}
		};

		fetchCategories();
	}, []);

	// fetch para traer recetas
	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'RECIPES'));
				const fetchedRecipes = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setRecipes(fetchedRecipes);
			} catch (error) {
				console.error('Error fetching ingredients:', error);
			}
		};

		fetchRecipes();
	}, []);

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
		setSearchIngredient(event.target.value);
	};

	const filteredRecipes = recipes.filter((recipe) => recipe.recipe_name.toLowerCase().includes(search.toLowerCase()));
	const filteredIngredient = ingredients.filter((ingredient) =>
		ingredient.name.toLowerCase().includes(searchIngredient.toLowerCase())
	);

	return (
		<>
			<NavMenu></NavMenu>

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
								<CategorieButton key={category.id} emoji={category.emoji} categorie={category.name}></CategorieButton>
							))}
						</section>

						<section className='container-ingredients'>
							{searchIngredient &&
								filteredIngredient.map((ingrediente) => (
									<IngredientButton key={ingrediente.id} name={ingrediente.name} emoji={ingrediente.emoji} />
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
