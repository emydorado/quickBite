import './search.css';
import { categories } from '../../data/categories';
import IngredientButton from '../../components/ingredientButton/ingredientButton';
import { ingredientes } from '../../data/ingredients';
import { recipes } from '../../data/recipes';
import BigCardDish from '../../components/bigCardDish/bigCardDish';
import NavMenu from '../../components/navMenu/navMenu';
import CategorieButton from '../../components/categorieButton';
import { useState } from 'react';

function Search() {
	const [search, setSearch] = useState('');

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const filteredRecipes = recipes.filter((recipe) => recipe.recipe_name.toLowerCase().includes(search.toLowerCase()));
	console.log(filteredRecipes);

	return (
		<>
			<NavMenu></NavMenu>

			<div id='search-container'>
				<div className='top-section'>
					<h1 className='search-title'>Search for recipes</h1>

					<input
						type='text'
						placeholder="What's in your fridge?..."
						className='search-input'
						value={search}
						onChange={handleSearchChange}
					/>

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
					{filteredRecipes.map((recipe) => (
						<BigCardDish
							key={recipe.id}
							id={recipe.id}
							img={recipe.img}
							title={recipe.recipe_name}
							time={recipe.prep_time_minutes}
						/>
					))}
				</section>
			</div>
		</>
	);
}

export default Search;
