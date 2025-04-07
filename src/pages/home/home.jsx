import BigCardDish from '../../components/bigCardDish/bigCardDish';
import SmallCardDish from '../../components/smallCardDish/smallCardDish';
import SavedCardDish from '../../components/savedCardDish/savedCardDish';
import NavMenu from '../../components/navMenu/navMenu';
import ChecklistCardDish from '../../components/checklistCardDish/checklistCardDish';
import IngredientButton from '../../components/ingredientButton/ingredientButton';
import { recipes } from '../../data/recipes';
import { ingredientes } from '../../data/ingredients';

function Home() {
	return (
		<>
			{recipes[4] && (
				<ChecklistCardDish
					key={recipes[4].id}
					img={recipes[4].img}
					title={recipes[4].recipe_name}
					time={recipes[4].id}
				/>
			)}

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
