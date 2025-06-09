import { useNavigate } from 'react-router-dom';
import './welcome.css';
import { useEffect } from 'react';

function Welcome() {
	const navigate = useNavigate();

	useEffect(() => {
		document.body.classList.add('welcome-body');

		return () => {
			document.body.classList.remove('welcome-body');
		};
	}, []);

	return (
		<>
			<div className='Container'>
				<h1 className='welcome-title'>Welcome</h1>
				<img
					className='welcome-logo'
					src='https://res.cloudinary.com/dkhpqx9na/image/upload/v1749402955/logo_fdu3m1.png'
					alt='QuickBite-logo'
				/>
				<p className='welcome-slogan'>Cook delicious recipes with what’s in your fridge</p>
				<button onClick={() => navigate('/signup')} className='welcome-button-started'>
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
