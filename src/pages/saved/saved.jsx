import SavedCardDish from '../../components/savedCardDish/savedCardDish';
import NavMenu from '../../components/navMenu/navMenu';
import { recipes } from '../../data/recipes';
import { useSelector } from 'react-redux';
import './saved.css';

function Saved() {
	const saved = useSelector((state) => state.savedRecipes.saved);
	const savedRecipes = recipes.filter((recipe) => saved.includes(recipe.id));

	return (
		<>
			<div className='saved-container'>
				<NavMenu></NavMenu>

				<h1 className='saved-title'>Saved recipes</h1>

				<section id='saved-cards'>
					{savedRecipes.map((recipe) => (
						<SavedCardDish
							key={recipe.id}
							recipeId={recipe.id}
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

export default Saved;
