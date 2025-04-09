import SavedCardDish from '../../components/savedCardDish/savedCardDish';
import { recipes } from '../../data/recipes';
import NavMenu from '../../components/navMenu/navMenu';
import './saved.css';

function Saved() {
	return (
		<>
			<NavMenu></NavMenu>

			<h1 className='saved-title'>Saved recipes</h1>

			<section id='saved-cards'>
				{[3, 4, 5, 6, 7].map((i) =>
					recipes[i] ? (
						<SavedCardDish
							key={recipes[i].id}
							img={recipes[i].img}
							title={recipes[i].recipe_name}
							time={recipes[i].prep_time_minutes}
						/>
					) : null
				)}
			</section>
		</>
	);
}

export default Saved;
