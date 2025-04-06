import BigCardDish from '../../components/bigCardDish/bigCardDish';
import SmallCardDish from '../../components/smallCardDish/smallCardDish';
import { recipes } from '../../data/recipes';

function Home() {
	console.log(recipes);

	return (
		<>
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
