import { useNavigate } from 'react-router-dom';
import './login.css';

function LogIn() {
	const navigate = useNavigate();

	return (
		<div className='login-wrapper'>
			<div className='login-container'>
				<h1 className='login-title'>Welcome back!</h1>
				<p className='login-subtitle'>Please Log In to continue</p>

				<label htmlFor='email' className='login-label'>
					Email
				</label>
				<ul></ul>
				<input type='email' id='email' className='login-input' placeholder='Example@quickbite.com' />
				<ul></ul>

				<label htmlFor='password' className='login-label'>
					Password
				</label>
				<ul></ul>
				<input type='password' id='password' className='login-input-password' placeholder='Your Password' />
				<ul></ul>

				<p className='login-forgot-password'>Forget password?</p>

				<button className='login-button' onClick={() => navigate('/home')}>
					Log in
				</button>

				<section className='login-signup'>
					<p className='login-account'>Don't have an account? </p>
					<p className='signup-button' onClick={() => navigate('/signup')}>
						Sign Up
					</p>
				</section>
			</div>
		</div>
	);
}

export default LogIn;
