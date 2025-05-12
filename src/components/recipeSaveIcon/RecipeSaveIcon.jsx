import './RecipeSaveIcon.css';
import { useState, useEffect } from 'react';
import { saveRecipe, checkIfRecipeSaved, removeSavedRecipe } from '../../services/firebaseUtils';
import { useSelector } from 'react-redux';

const RecipeSaveIcon = ({ recipeId }) => {
	const [isSaved, setIsSaved] = useState(false);
	const uid = useSelector((state) => state.auth.uid);

	useEffect(() => {
		if (!uid) return;

		const checkSaved = async () => {
			const saved = await checkIfRecipeSaved(uid, recipeId);
			setIsSaved(saved);
		};
		checkSaved();
	}, [recipeId, uid]);

	const handleClick = async () => {
		if (!uid) {
			console.warn('Usuario no autenticado, no se puede guardar la receta');
			return;
		}

		if (isSaved) {
			await removeSavedRecipe(uid, recipeId);
			setIsSaved(false);
		} else {
			await saveRecipe(uid, recipeId);
			setIsSaved(true);
		}
	};

	return (
		<div id='save-icon'>
			<button onClick={handleClick} className={isSaved ? 'saved' : 'unsaved'}>
				{isSaved ? (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='5vw'
						height='5vw'
						viewBox='0 0 24 24'
						className='recipe-save-icon'
						style={{ fill: '#ffffff' }}
					>
						<path d='M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z'></path>
					</svg>
				) : (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='5vw'
						height='5vw'
						viewBox='0 0 24 24'
						className='recipe-save-icon'
						style={{ fill: '#8bc652' }}
					>
						<path d='M18 2H6c-1.103 0-2 .897-2 2v18l8-4.572L20 22V4c0-1.103-.897-2-2-2zm0 16.553-6-3.428-6 3.428V4h12v14.553z' />
					</svg>
				)}
			</button>
		</div>
	);
};

export default RecipeSaveIcon;
