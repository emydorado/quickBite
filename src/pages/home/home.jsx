import NavMenu from '../../components/navMenu/navMenu';
import SmallCardDish from '../../components/smallCardDish/smallCardDish';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchRecipes } from '../../services/firebaseUtils';
import { db } from '../../services/firebaseConfig';
import { query, collection, getDocs, where } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import './home.css';

const Home = () => {
	const [randomRecipe, setRandomRecipe] = useState([]);
	const [chickenRecipes, setChickenRecipes] = useState([]);
	const [quickRecipes, setQuickRecipes] = useState([]);
	const [doneRecipeIds, setDoneRecipeIds] = useState([]);
	const [doneRecipes, setDoneRecipes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [recipes, setRecipes] = useState([]);
	const [relatedRecipes, setRelatedRecipes] = useState([]);
	const [relatedTitle, setRelatedTitle] = useState([]);
	const uid = useSelector((state) => state.auth.uid);

	// fetch recetas
	useEffect(() => {
		const loadRecipes = async () => {
			const recipes = await fetchRecipes();
			setRecipes(recipes);
		};
		loadRecipes();
	}, []);

	// recetas random
	useEffect(() => {
		function handleRandom() {
			if (recipes.length >= 0) {
				const shuffled = [...recipes].sort(() => 0.5 - Math.random());
				const selected = shuffled.slice(0, 6);
				setRandomRecipe(selected);
			}
		}
		handleRandom();
	}, [recipes]);

	// recetas en 20 minutos
	useEffect(() => {
		function handleQuickRecipes() {
			const filtered = recipes.filter((recipe) => Number(recipe.prep_time_minutes) <= 20);

			const shuffled = [...filtered].sort(() => 0.5 - Math.random());
			const selected = shuffled.slice(0, 6);
			setQuickRecipes(selected);
		}
		handleQuickRecipes();
	}, [recipes]);

	// recetas de pollo
	useEffect(() => {
		function handleChickenRecipes() {
			const filtered = recipes.filter((recipe) =>
				recipe.ingredients?.some((ingredient) => ingredient.name?.toLowerCase().includes('chicken'))
			);
			const shuffled = [...filtered].sort(() => 0.5 - Math.random());
			const selected = shuffled.slice(0, 6);
			setChickenRecipes(selected);
		}
		handleChickenRecipes();
	}, [recipes]);

	// recetas repetibles
	useEffect(() => {
		const fetchMarkAsDoneRecipes = async () => {
			const q = query(collection(db, 'alreadyDoneRecipes'), where('uid', '==', uid));
			const querySnapshot = await getDocs(q);
			const ids = querySnapshot.docs.map((doc) => doc.data().recipeId);

			const shuffled = ids.sort(() => 0.5 - Math.random());
			const selected = shuffled.slice(0, 6);

			setDoneRecipeIds(selected);
			setLoading(false);
		};
		fetchMarkAsDoneRecipes();
	}, [uid]);

	useEffect(() => {
		const doneRecipes = recipes.filter((recipe) => doneRecipeIds.includes(String(recipe.id)));

		setDoneRecipes(doneRecipes);
	}, [recipes, doneRecipeIds]);

	// recetas porque te gustó tal
	useEffect(() => {
		if (doneRecipes.length > 0) {
			const randomDoneRecipe = doneRecipes[Math.floor(Math.random() * doneRecipes.length)];
			const ingredientNames = randomDoneRecipe.ingredients.map((ing) => ing.name);
			const randomIngredient = ingredientNames[Math.floor(Math.random() * ingredientNames.length)];
			console.log(randomIngredient);

			setRelatedTitle(randomIngredient);

			const filtered = recipes.filter(
				(recipe) =>
					recipe.id !== randomDoneRecipe.id &&
					Array.isArray(recipe.ingredients) &&
					recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(randomIngredient.toLowerCase()))
			);

			setRelatedRecipes(filtered);
		}
	}, [recipes, doneRecipes]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<section className='home-container'>
					<h1 className='home-title'>Explore recipes</h1>

					<NavMenu />

					{randomRecipe.length === 0 ? (
						<p>Loading recipes...</p>
					) : (
						<div className='recomended-recipes-home'>
							<p className='home-subtitle'>Recommended by us</p>

							<div className='home-section'>
								{randomRecipe.map((recipe) => (
									<SmallCardDish
										key={recipe.id}
										id={recipe.id}
										img={recipe.img}
										title={recipe.recipe_name}
										time={recipe.prep_time_minutes}
									/>
								))}
							</div>

							{doneRecipes.length > 0 && (
								<>
									<p className='home-subtitle'>Crave again</p>
									<div className='home-section'>
										{doneRecipes.map((recipe) => (
											<SmallCardDish
												key={recipe.id}
												id={recipe.id}
												img={recipe.img}
												time={recipe.prep_time_minutes}
												title={recipe.recipe_name}
											/>
										))}
									</div>
								</>
							)}

							{relatedRecipes.length > 0 && (
								<>
									<p className='home-subtitle'>Because you liked recipes with {relatedTitle}</p>
									<div className='home-section'>
										{relatedRecipes.map((recipe) => (
											<SmallCardDish
												key={recipe.id}
												id={recipe.id}
												img={recipe.img}
												title={recipe.recipe_name}
												time={recipe.prep_time_minutes}
											/>
										))}
									</div>
								</>
							)}

							<p className='home-subtitle'>Chicken fix</p>
							<div className='home-section'>
								{chickenRecipes.map((recipe) => (
									<SmallCardDish
										key={recipe.id}
										id={recipe.id}
										img={recipe.img}
										title={recipe.recipe_name}
										time={recipe.prep_time_minutes}
									/>
								))}
							</div>

							<p className='home-subtitle'>Ready in 20 minutes</p>
							<div className='home-section'>
								{quickRecipes.map((recipe) => (
									<SmallCardDish
										key={recipe.id}
										id={recipe.id}
										img={recipe.img}
										title={recipe.recipe_name}
										time={recipe.prep_time_minutes}
									/>
								))}
							</div>
						</div>
					)}
				</section>
			)}
		</>
	);
};
export default Home;
