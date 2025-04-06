import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './welcome.css';

function Welcome() {
	return (
		<>
		<div className='Container'>
			<h1 className='welcome-title'>Welcome</h1>
			<img className='welcome-logo' src={logo} alt='QuickBite-logo' />
			<Link to='/home'>Ir a home</Link>
			<p className='welcome-slogan'>Cook delicious recipes with what’s in your fridge</p>
			<button className='welcome-button-started'>Get Started</button>
			<section className='welcome-login'>
				<p className='welcome-already'>Already have an account? </p>
				<p className='welcome-login-button'>Log in</p>
			</section>
			</div>
		</>
	);
}

export default Welcome;
