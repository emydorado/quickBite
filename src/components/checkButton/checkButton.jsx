import './checkList.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDone } from '../../redux/doneRecipes/doneRecipesSlice';

const CheckButton = ({ recipeId }) => {
	const dispatch = useDispatch();
	const done = useSelector((state) => state.doneRecipes.done);
	const alreadyDone = Array.isArray(done) && done.includes(recipeId);
	const toggleCheck = () => {
		dispatch(toggleDone(recipeId));
	};

	return (
		<div id='checklist'>
			<button onClick={toggleCheck} className={alreadyDone ? 'checked' : 'unchecked'}>
				{alreadyDone ? (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						className='bookmark'
						style={{ fill: '#ffffff' }}
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
					>
						<path d='m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z'></path>
					</svg>
				)}
			</button>
		</div>
	);
};

export default CheckButton;
