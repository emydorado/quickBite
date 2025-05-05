import './checkList.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDone } from '../../redux/doneRecipes/doneRecipesSlice';

const CheckButton = ({ recipeId }) => {
	const dispatch = useDispatch();
	const done = useSelector((state) => state.doneRecipes.saved);
	const alreadyDone = done.includes(recipeId);

	const toggleCheck = () => {
		dispatch(toggleDone(recipeId));
	};

	return (
		<div id='checklist'>
			<button onClick={toggleCheck} className={alreadyDone ? 'checked' : 'unchecked'}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					className='bookmark'
					style={{ fill: alreadyDone ? '#ffffff' : '#8bc652' }}
				>
					<path d='m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z'></path>
				</svg>
			</button>
		</div>
	);
};

export default CheckButton;
