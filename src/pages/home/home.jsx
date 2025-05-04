import SmallCardDish from '../../components/smallCardDish/smallCardDish';
import NavMenu from '../../components/navMenu/navMenu';
import { recipes } from '../../data/recipes';
import './home.css';

const Home = () => {
	const sections = [
		{
			title: 'Recommended recipes',
			recipeIndexes: [1, 2, 3, 4, 5, 6],
		},
		{
			title: 'Lastest recipes made by you',
			recipeIndexes: [7, 8, 9, 10, 11, 12],
		},
		{
			title: 'Because you liked "Chickpea cookies"',
			recipeIndexes: [13, 14, 15, 16, 17, 18],
		},
	];

	return (
		<section className='home-container'>
			<h1 className='home-title'>Explore recipes</h1>

			<NavMenu />

			{sections.map(({ title, recipeIndexes }, i) => (
				<section key={i}>
					<p className='home-subtitle'>{title}</p>
					<div className={`home-section home-section-${i}`}>
						{recipeIndexes.map((index) => {
							const recipe = recipes[index];
							if (!recipe) return null;
							return (
								<SmallCardDish
									key={recipe.id}
									id={recipe.id}
									img={recipe.img}
									title={recipe.recipe_name}
									time={recipe.prep_time_minutes}
								/>
							);
						})}
					</div>
				</section>
			))}
		</section>
	);
};

export default Home;