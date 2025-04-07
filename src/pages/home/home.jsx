import BigCardDish from '../../components/bigCardDish/bigCardDish';
import SmallCardDish from '../../components/smallCardDish/smallCardDish';
import SavedCardDish from '../../components/savedCardDish/savedCardDish';
import NavMenu from '../../components/navMenu/navMenu';
import ChecklistCardDish from '../../components/checklistCardDish/checklistCardDish';
import CheckButton from '../../components/checkButton/checkButton';
import IngredientButton from '../../components/ingredientButton/ingredientButton';
import { recipes } from '../../data/recipes';
import { ingredientes } from '../../data/ingredients';

function Home() {
	return (
		<>
			{recipes.map((recipe) => {
				return <ChecklistCardDish key={recipe.id} img={recipe.img} title={recipe.recipe_name} time={recipe.id} />;
			})}
			<CheckButton></CheckButton>

			<NavMenu></NavMenu>
			{ingredientes[0] && (
				<IngredientButton key={ingredientes[0].id} name={ingredientes[0].name} emoji={ingredientes[0].emoji} />
			)}

			{recipes[1] && (
				<BigCardDish key={recipes[1].id} img={recipes[1].img} title={recipes[1].recipe_name} time={recipes[1].id} />
			)}

			{recipes[2] && (
				<SmallCardDish key={recipes[2].id} img={recipes[2].img} title={recipes[2].recipe_name} time={recipes[2].id} />
			)}

			{recipes[3] && (
				<SavedCardDish key={recipes[3].id} img={recipes[3].img} title={recipes[3].recipe_name} time={recipes[3].id} />
			)}
		</>
	);
}

export default Home;
