import BigCardDish from '../../components/bigCardDish/bigCardDish';
import SmallCardDish from '../../components/smallCardDish/smallCardDish';
import SavedCardDish from '../../components/savedCardDish/savedCardDish';
import NavMenu from '../../components/navMenu/navMenu';
import { recipes } from '../../data/recipes';
import './home.css';

function Home() {
	return (
		<>
			<section className='home-container'>
				<h1 className='home-title'>Explore recipes</h1>

				<NavMenu></NavMenu>

				<p className='home-subtitle'>Recommended recipes</p>
				<section className='home-recommended'>
					{recipes[1] && (
						<SmallCardDish
							key={recipes[1].id}
							img={recipes[1].img}
							title={recipes[1].recipe_name}
							time={recipes[1].id}
						/>
					)}
					{recipes[2] && (
						<SmallCardDish
							key={recipes[2].id}
							img={recipes[2].img}
							title={recipes[2].recipe_name}
							time={recipes[2].id}
						/>
					)}
					{recipes[3] && (
						<SmallCardDish
							key={recipes[3].id}
							img={recipes[3].img}
							title={recipes[3].recipe_name}
							time={recipes[3].id}
						/>
					)}
					{recipes[4] && (
						<SmallCardDish
							key={recipes[4].id}
							img={recipes[4].img}
							title={recipes[4].recipe_name}
							time={recipes[4].id}
						/>
					)}
				</section>

				<p className='home-subtitle'>Lastest recipes made by you</p>
				<section className='home-made-by-you'>
					{recipes[5] && (
						<SmallCardDish
							key={recipes[5].id}
							img={recipes[5].img}
							title={recipes[5].recipe_name}
							time={recipes[5].id}
						/>
					)}
					{recipes[6] && (
						<SmallCardDish
							key={recipes[6].id}
							img={recipes[6].img}
							title={recipes[6].recipe_name}
							time={recipes[6].id}
						/>
					)}
					{recipes[7] && (
						<SmallCardDish
							key={recipes[7].id}
							img={recipes[7].img}
							title={recipes[7].recipe_name}
							time={recipes[7].id}
						/>
					)}
					{recipes[8] && (
						<SmallCardDish
							key={recipes[8].id}
							img={recipes[8].img}
							title={recipes[8].recipe_name}
							time={recipes[8].id}
						/>
					)}
				</section>

				<p className='home-subtitle'>Because you liked "Chickpea cookies"</p>
				<section className='home-because-you-like'>
					{recipes[3] && (
						<SmallCardDish
							key={recipes[9].id}
							img={recipes[9].img}
							title={recipes[9].recipe_name}
							time={recipes[9].id}
						/>
					)}
					{recipes[3] && (
						<SmallCardDish
							key={recipes[10].id}
							img={recipes[10].img}
							title={recipes[10].recipe_name}
							time={recipes[10].id}
						/>
					)}
					{recipes[3] && (
						<SmallCardDish
							key={recipes[11].id}
							img={recipes[11].img}
							title={recipes[11].recipe_name}
							time={recipes[11].id}
						/>
					)}
					{recipes[3] && (
						<SmallCardDish
							key={recipes[12].id}
							img={recipes[12].img}
							title={recipes[12].recipe_name}
							time={recipes[12].id}
						/>
					)}
					{recipes[3] && (
						<SmallCardDish
							key={recipes[13].id}
							img={recipes[13].img}
							title={recipes[13].recipe_name}
							time={recipes[13].id}
						/>
					)}
				</section>
			</section>
		</>
	);
}

export default Home;
