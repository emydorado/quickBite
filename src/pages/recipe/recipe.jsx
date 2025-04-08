<<<<<<< HEAD
=======
import RecipeComponent from '../../components/recipe/recipe';
import { useParams } from 'react-router-dom';
import { recipes } from '../../data/recipes';

>>>>>>> e0e7a6f379be59fce8e92d41aa4baa566c31ad82
function Recipe() {
	const { id } = useParams();
	const receta = recipes.find((rec) => rec.id === parseInt(id));

	if (!receta) return <p>Receta no encontrada</p>;

	return (
		<>
<<<<<<< HEAD
			<h1>recipe</h1>
=======
			<RecipeComponent
				key={receta.id}
				img={receta.img}
				time={receta.id}
				title={receta.recipe_name}
				ingredients={receta.ingredients}
			/>
>>>>>>> e0e7a6f379be59fce8e92d41aa4baa566c31ad82
		</>
	);
}
export default Recipe;
