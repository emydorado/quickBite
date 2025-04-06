import BigCardDish from '../../components/bigCardDish/bigCardDish';
import SmallCardDish from '../../components/smallCardDish/smallCardDish';
import IngredientButton from '../../components/ingredientButton/ingredientButton';
import { recipes } from '../../data/recipes';
import { ingredientes } from '../../data/ingredients';

function Home() {
	console.log(recipes);

	return (
		<>
			{ingredientes.map((ingrediente) => {
				return (
					<IngredientButton key={ingrediente.id} name={ingrediente.name} emoji={ingrediente.emoji}></IngredientButton>
				);
			})}

			{recipes.map((recipe) => {
				return <BigCardDish key={recipe.id} img={recipe.img} title={recipe.recipe_name} time={recipe.id}></BigCardDish>;
			})}

			{recipes.map((recipe) => {
				return (
					<SmallCardDish key={recipe.id} img={recipe.img} title={recipe.recipe_name} time={recipe.id}></SmallCardDish>
				);
			})}
		</>
	);
}

export default Home;
