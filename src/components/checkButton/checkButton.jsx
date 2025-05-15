import './checkList.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkIfRecipeIsDone, markAsDoneRecipe, removeMarkAsDoneRecipe } from '../../services/firebaseUtils';

const CheckButton = ({ recipeId }) => {
	const [alreadyDone, setAlreadyDone] = useState(false);
	const uid = useSelector((state) => state.auth.uid);

	useEffect(() => {
		if (!uid) return;

		const checkedRecipe = async () => {
			const done = await checkIfRecipeIsDone(uid, recipeId);
			setAlreadyDone(done);
		};
		checkedRecipe();
	}, [recipeId, uid]);

	const toggleCheck = async () => {
		if (!uid) {
			console.warn('Usuario no autenticado, no se puede guardar la receta');
			return;
		}

		if (alreadyDone) {
			await removeMarkAsDoneRecipe(uid, recipeId);
			setAlreadyDone(false);
		} else {
			await markAsDoneRecipe(uid, recipeId);
			setAlreadyDone(true);
		}
	};

	return (
		<div id='checklist'>
			<button
				type='button'
				onClick={toggleCheck}
				className={alreadyDone ? 'checked' : 'unchecked'}
				aria-pressed={alreadyDone}
				aria-label={alreadyDone ? 'Marcar receta como no hecha' : 'Marcar receta como hecha'}
			>
				{alreadyDone ? (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						className='bookmark'
						style={{ fill: '#ffffff' }}
						aria-hidden='true'
					>
						<path d='m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z'></path>
					</svg>
				) : (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						className='bookmark'
						style={{ fill: '#8bc652' }}
						aria-hidden='true'
					>
						<path d='m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z'></path>
					</svg>
				)}
			</button>
		</div>
	);
};

export default CheckButton;
