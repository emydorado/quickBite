import { useState } from 'react';
import './RecipeSaveIcon.css';

const RecipeSaveIcon = () => {
	const [isSaved, setIsSaved] = useState(false);

	const toggleSaved = () => {
		setIsSaved(!isSaved);
	};

	return (
		<div id='icon' onClick={toggleSaved} style={{ cursor: 'pointer' }}>
			{isSaved ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='5vw'
					height='5vw'
					viewBox='0 0 24 24'
					className='recipe-save-icon'
					style={{ fill: '#8bc652' }}
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
		</div>
	);
};

export default RecipeSaveIcon;
