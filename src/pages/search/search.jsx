import './search.css';
import { categories } from '../../data/categories';

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
			<h3 className='search-empty'>Tell us what's in your fridge and prepare the best recipe</h3>
		</>
	);
}

export default Search;
