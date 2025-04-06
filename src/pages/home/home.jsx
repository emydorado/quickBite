import BigCardDish from '../../components/bigCardDish/bigCardDish';
import { recipes } from '../../data/recipes';

function Home() {
	console.log(recipes);

	return (
		<>
			{recipes.map((recipe) => {
				return <BigCardDish key={recipe.id} img={recipe.img} title={recipe.recipe_name} time={recipe.id}></BigCardDish>;
			})}
		</>
	);
}

export default Home;
