import { useState } from 'react';
import './checkList.css';

const CheckButton = () => {
	const [isChecked, setIsChecked] = useState(false);

	const toggleCheck = () => {
		setIsChecked(!isChecked);
	};

	return (
		<div id='checklist'>
			<button onClick={toggleCheck} className={isChecked ? 'checked' : 'unchecked'}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					className='bookmark'
					style={{ fill: isChecked ? '#ffffff' : '#8bc652' }}
				>
					<path d='m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z'></path>
				</svg>
			</button>
		</div>
	);
};

export default CheckButton;
