import RecipeComponent from '../../components/recipe/recipe';
import { useParams } from 'react-router-dom';
import { recipes } from '../../data/recipes';

function Recipe() {
	const { id } = useParams();
	const receta = recipes.find((rec) => rec.id === parseInt(id));
	if (!receta) return <p>Receta no encontrada</p>;

	return (
		<>
			<section>
				<RecipeComponent
					key={receta.id}
					id={receta.id}
					img={receta.img}
					time={receta.prep_time_minutes}
					title={receta.recipe_name}
					ingredients={receta.ingredients}
					steps={receta.steps}
				/>
			</section>
		</>
	);
}
export default Recipe;
