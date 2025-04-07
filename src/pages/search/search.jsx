import './search.css';
import { categories } from '../../data/categories';
import IngredientButton from '../../components/ingredientButton/ingredientButton';
import { ingredientes } from '../../data/ingredients';
import { recipes } from '../../data/recipes';
import BigCardDish from '../../components/bigCardDish/bigCardDish';

function Search() {
	return (
		<>
			<h1 className='search-title'>Search for recipes</h1>
			<input type='text' placeholder="What's in your fridge?" className='search-input' />
			<section className='container-ingredients'>
				<div className='categories-food'>
					<span>{categories[0].emoji}</span> {categories[0].name}
				</div>
				<div className='categories-food'>
					<span>{categories[1].emoji}</span> {categories[1].name}
				</div>
				<div className='categories-food'>
					<span>{categories[2].emoji}</span> {categories[2].name}
				</div>
				<div className='categories-food'>
					<span>{categories[3].emoji}</span> {categories[3].name}
				</div>
				<div className='categories-food'>
					<span>{categories[4].emoji}</span> {categories[4].name}
				</div>
				<div className='categories-food'>
					<span>{categories[5].emoji}</span> {categories[5].name}
				</div>
			</section>
			<section className='search-ingredients'>
				{ingredientes[2] && (
					<IngredientButton key={ingredientes[2].id} name={ingredientes[2].name} emoji={ingredientes[2].emoji} />
				)}
				{ingredientes[5] && (
					<IngredientButton key={ingredientes[5].id} name={ingredientes[5].name} emoji={ingredientes[5].emoji} />
				)}
			</section>
			{recipes[1] && (
				<BigCardDish key={recipes[1].id} img={recipes[1].img} title={recipes[1].recipe_name} time={recipes[1].id} />
			)}
		</>
	);
}

export default Search;
