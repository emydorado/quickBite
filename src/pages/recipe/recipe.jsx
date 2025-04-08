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
				{recipes
					.filter((recipes) => recipes.id === 1) // Filtra los elementos con id: 1 o id: 2
					.map((recipes) => (
						<RecipeComponent
							key={recipes.id}
							img={recipes.img}
							time={recipes.prep_time_minutes}
							title={recipes.recipe_name}
							ingredients={recipes.ingredients}
							steps={recipes.steps}
						/>
					))}
			</section>
		</>
	);
}
export default Recipe;
