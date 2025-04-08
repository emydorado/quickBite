import RecipeComponent from '../../components/recipe/recipe';
import { useParams } from 'react-router-dom';
import { recipes } from '../../data/recipes';

function Recipe() {
	const { id } = useParams();
	const receta = recipes.find((rec) => rec.id === parseInt(id));

	if (!receta) return <p>Receta no encontrada</p>;

	return (
		<>
			<RecipeComponent
				key={receta.id}
				img={receta.img}
				time={receta.id}
				title={receta.recipe_name}
				ingredients={receta.ingredients}
			/>
		</>
	);
}
export default Recipe;
