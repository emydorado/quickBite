import NavMenu from '../../components/navMenu/navMenu';
import SmallCardDish from '../../components/smallCardDish/smallCardDish';
import { useEffect, useState } from 'react';
import { fetchRecipes } from '../../services/firebaseUtils';
import './home.css';

const Home = () => {
	const [randomRecipe, setRandomRecipe] = useState([]);
	const [chickenRecipes, setChickenRecipes] = useState([]);
	const [quickRecipes, setQuickRecipes] = useState([]);
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		const loadRecipes = async () => {
			const recipes = await fetchRecipes();
			setRecipes(recipes);
		};
		loadRecipes();
	}, []);

	useEffect(() => {
		function handleRandom() {
			if (recipes.length >= 0) {
				const shuffled = [...recipes].sort(() => 0.5 - Math.random());
				const selected = shuffled.slice(0, 7);
				setRandomRecipe(selected);
			}
		}
		handleRandom();
	}, [recipes]);

	useEffect(() => {
		function handleQuickRecipes() {
			const quickRecipes = recipes.filter((recipe) => Number(recipe.prep_time_minutes) <= 20);
			setQuickRecipes(quickRecipes);
		}
		handleQuickRecipes();
	}, [recipes]);

	useEffect(() => {
		function handleChickenRecipes() {
			const selectedRecipe = recipes.filter((recipe) =>
				recipe.ingredients?.some((ingredient) => ingredient.name?.toLowerCase().includes('chicken'))
			);
			setChickenRecipes(selectedRecipe);
		}
		handleChickenRecipes();
	}, [recipes]);

	return (
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

					<p className='home-subtitle'>Latest recipes made by you</p>
					<div className='home-section'></div>

					<p className='home-subtitle'>Beacuse you liked</p>
					<div className='home-section'></div>

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
					<div className='home-section'></div>

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
					<div className='home-section'></div>
				</div>
			)}
		</section>
	);
};
export default Home;
