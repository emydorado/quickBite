import RecipeComponent from '../../components/recipe/recipe';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipes } from '../../services/firebaseUtils';
import Loader from '../../components/loader/Loader';

function Recipe() {
	const { id } = useParams();
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadRecipes = async () => {
			const recipes = await fetchRecipes();
			setRecipes(recipes);
			setLoading(false);
		};
		loadRecipes();
	}, []);

	const receta = recipes.find((rec) => rec.id === id);
	if (!receta) return <Loader />;

	return (
		<>
			{loading ? (
				<Loader />
			) : (
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
			)}
		</>
	);
}
export default Recipe;
