import { useDispatch, useSelector } from 'react-redux';
import { toggleSave } from '../../redux/savedRecipes/savedRecipesSlice';
import './savedIcon.css';

const SavedIcon = ({ recipeId }) => {
	const dispatch = useDispatch();
	const saved = useSelector((state) => state.savedRecipes.saved);
	const isSaved = saved.includes(recipeId);

	const handleClick = () => {
		dispatch(toggleSave(recipeId));
	};

	return (
		<div
			id='icon'
			onClick={() => {
				handleClick();
			}}
			style={{ cursor: 'pointer' }}
		>
			{isSaved ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='5vw'
					height='5vw'
					viewBox='0 0 24 24'
					className='saved-icon'
					style={{ fill: '#6b6967' }}
				>
					<path d='M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z'></path>
				</svg>
			) : (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='5vw'
					height='5vw'
					viewBox='0 0 24 24'
					className='saved-icon'
					style={{ fill: '#6b6967' }}
				>
					<path d='M18 2H6c-1.103 0-2 .897-2 2v18l8-4.572L20 22V4c0-1.103-.897-2-2-2zm0 16.553-6-3.428-6 3.428V4h12v14.553z' />
				</svg>
			)}
		</div>
	);
};

export default SavedIcon;
