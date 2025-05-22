import './Loader.css';

function Loader() {
	return (
		<div className='loader-fullscreen'>
			<div className='spinner'></div>
			<span className='loader-text'>Loading recipes...</span>
		</div>
	);
}

export default Loader;
