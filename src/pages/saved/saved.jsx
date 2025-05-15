import SavedCardDish from '../../components/savedCardDish/savedCardDish';
import NavMenu from '../../components/navMenu/navMenu';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { db } from '../../services/firebaseConfig';
import { fetchRecipes } from '../../services/firebaseUtils';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Loader from '../../components/loader/Loader'; // 👈 importar el loader
import './saved.css';

function Saved() {
	const [savedRecipeIds, setSavedRecipeIds] = useState([]);
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true); // 👈 estado para el loader
	const uid = useSelector((state) => state.auth.uid);

	useEffect(() => {
		const loadRecipes = async () => {
			const recipes = await fetchRecipes();
			setRecipes(recipes);
		};
		loadRecipes();
	}, []);

	useEffect(() => {
		if (!uid) return;

		const fetchSavedRecipes = async () => {
			const q = query(collection(db, 'savedRecipes'), where('uid', '==', uid));
			const querySnapshot = await getDocs(q);
			const ids = querySnapshot.docs.map((doc) => doc.data().recipeId);
			setSavedRecipeIds(ids);
			setLoading(false);
		};
		fetchSavedRecipes();
	}, [uid]);

	const savedRecipes = recipes.filter((recipe) => savedRecipeIds.includes(recipe.id));

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<div className='saved-container'>
				<NavMenu />
				<h1 className='saved-title'>Saved recipes</h1>
				<section id='saved-cards'>
					{savedRecipes.map((recipe) => (
						<SavedCardDish
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

export default Saved;
