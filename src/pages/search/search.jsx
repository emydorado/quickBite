import './search.css';
import { categories } from '../../data/categories';
import IngredientButton from '../../components/ingredientButton/ingredientButton';
import { ingredientes } from '../../data/ingredients';
import { recipes } from '../../data/recipes';
import BigCardDish from '../../components/bigCardDish/bigCardDish';
import NavMenu from '../../components/navMenu/navMenu';
import CategorieButton from '../../components/categorieButton';

function Search() {
	return (
		<>
			<NavMenu></NavMenu>

			<div id='search-container'>
				<div className='top-section'>
					<h1 className='search-title'>Search for recipes</h1>

					<input type='text' placeholder="What's in your fridge?..." className='search-input' />

					<div id='filters'>
						<section className='container-categories'>
							{categories.map((category) => (
								<CategorieButton key={category.id} emoji={category.emoji} categorie={category.name}></CategorieButton>
							))}
						</section>

						<section className='search-ingredients'>
							{[2, 5].map((i) =>
								recipes[i] ? (
									<IngredientButton
										key={ingredientes[i].id}
										name={ingredientes[i].name}
										emoji={ingredientes[i].emoji}
									/>
								) : null
							)}
						</section>
					</div>
				</div>

				<section className='results'>
					{[8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((i) =>
						recipes[i] ? (
							<BigCardDish
								key={recipes[i].id}
								id={ingredientes[i].id}
								img={recipes[i].img}
								title={recipes[i].recipe_name}
								time={recipes[i].prep_time_minutes}
							/>
						) : null
					)}
				</section>
			</div>
		</>
	);
}

export default Search;
