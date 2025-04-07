import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import './welcome.css';

function Welcome() {
	const navigate = useNavigate();

	return (
		<>
			<div className='Container'>
				<h1 className='welcome-title'>Welcome</h1>
				<img className='welcome-logo' src={logo} alt='QuickBite-logo' />
				<p className='welcome-slogan'>Cook delicious recipes with what’s in your fridge</p>
				<button onClick={() => navigate('/home')} className='welcome-button-started'>
					Get Started
				</button>
				<section className='welcome-login'>
					<p className='welcome-already'>Already have an account? </p>
					<p className='welcome-login-button' onClick={() => navigate('/login')}>
						Log in
					</p>
				</section>
			</div>
		</>
	);
}

export default Welcome;
