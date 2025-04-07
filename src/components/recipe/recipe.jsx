import CheckButton from '../checkButton/checkButton';

const RecipeComponent = ({ img, title, time, ingredientes, step, description }) => {
	return (
		<div id='recipe-page'>
			<div id='top-section'>
				<img src={img} alt='dish picture' className='banner-image' />
				<h1 className='recipe-title'>{title} </h1>
				<p className='recipe-time'>{time}</p>
				<CheckButton></CheckButton>
			</div>
			<ol id='ingredients'>
				<li>{ingredientes}</li>
			</ol>
			<ol id='steps'>
				<li>
					<h3>{step}</h3>
					<p>{description}</p>
				</li>
			</ol>
		</div>
	);
};

export default RecipeComponent;
