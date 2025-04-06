import { Link } from 'react-router-dom';

function Welcome() {
	return (
		<>
			<h1>Welcome</h1>
			<Link to='/home'>Ir a home</Link>
		</>
	);
}

export default Welcome;
