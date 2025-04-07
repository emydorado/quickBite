import SavedCardDish from '../../components/savedCardDish/savedCardDish';
import { recipes } from '../../data/recipes';

function Saved() {
	return (
		<>
			<h1>Saved recipes</h1>
			{recipes[3] && (
				<SavedCardDish key={recipes[3].id} img={recipes[3].img} title={recipes[3].recipe_name} time={recipes[3].id} />
			)}
			{recipes[4] && (
				<SavedCardDish key={recipes[4].id} img={recipes[4].img} title={recipes[4].recipe_name} time={recipes[4].id} />
			)}
			{recipes[5] && (
				<SavedCardDish key={recipes[5].id} img={recipes[5].img} title={recipes[5].recipe_name} time={recipes[5].id} />
			)}
			{recipes[6] && (
				<SavedCardDish key={recipes[6].id} img={recipes[6].img} title={recipes[6].recipe_name} time={recipes[6].id} />
			)}
			{recipes[7] && (
				<SavedCardDish key={recipes[7].id} img={recipes[7].img} title={recipes[7].recipe_name} time={recipes[7].id} />
			)}
			{recipes[8] && (
				<SavedCardDish key={recipes[8].id} img={recipes[8].img} title={recipes[8].recipe_name} time={recipes[8].id} />
			)}
		</>
	);
}

export default Saved;
