import './search.css';
import { categories } from '../../data/categories';
import IngredientButton from '../../components/ingredientButton/ingredientButton';
import { ingredientes } from '../../data/ingredients';
import { recipes } from '../../data/recipes';
import BigCardDish from '../../components/bigCardDish/bigCardDish';
import NavMenu from '../../components/navMenu/navMenu';

function Search() {
	return (
		<>
			<NavMenu></NavMenu>

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
			{recipes[15] && (
				<BigCardDish key={recipes[15].id} img={recipes[15].img} title={recipes[15].recipe_name} time={recipes[15].id} />
			)}
			{recipes[16] && (
				<BigCardDish key={recipes[16].id} img={recipes[16].img} title={recipes[16].recipe_name} time={recipes[16].id} />
			)}
			{recipes[17] && (
				<BigCardDish key={recipes[17].id} img={recipes[17].img} title={recipes[17].recipe_name} time={recipes[17].id} />
			)}
		</>
	);
}

export default Search;
