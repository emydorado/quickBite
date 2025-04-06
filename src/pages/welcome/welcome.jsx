import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Welcome() {
	return (
		<>
			<h1>Welcome</h1>
			<img src={logo} alt='QuickBite-logo' style={{ width: '150px', height: 'auto' }} />
			<Link to='/home'>Ir a home</Link>
			<p>Cook delicious recipes with what’s in your fridge</p>
			<button>Get Started</button>
			<button>I already have an account</button>
		</>
	);
}

export default Welcome;
