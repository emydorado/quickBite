import { useNavigate } from 'react-router-dom';
import './signup.css';

function SignUp() {
	const navigate = useNavigate();

	return (
		<>
			<div className='signup-wrapper'>
				<div className='signup-container'>
				<h1 className='signup-title'>Sign Up</h1>
				<p className='signup-subtitle'>Create your new QuickBite account</p>
				<div>
					<label className='signup-label' htmlFor='name'>
						Name
					</label>
					<ul></ul>
					<input type='text' className='signup-input-name' name='name' id='name' placeholder='Jhon Doe' />
				</div>
				<div>
					<label className='signup-label' htmlFor='email'>
						Email
					</label>
					<ul></ul>
					<input
						type='email'
						className='signup-input-mail'
						name='email'
						id='email'
						placeholder='Example@quickbite.com'
					/>
				</div>
				<div>
					<label className='signup-label' htmlFor='password'>
						Password
					</label>
					<ul></ul>
					<input
						type='password'
						className='signup-input-password'
						name='password'
						id='password'
						placeholder='Your Password'
					/>
				</div>
				<div>
					<p className='signup-forgot-password'>Forget password?</p>
					<button className='signup-button' onClick={() => navigate('/home')}>
						Sign Up
					</button>
				</div>
				<div className='signup-container-login'>
					<p className='signup-already-text'>Already have an account? </p>
					<p className='signup-login-button' onClick={() => navigate('/login')}>
						Log in
					</p>
				</div>
				<div className='signup-container-login'>
					<p className='signup-already-text'>By continue you agree to our</p>
					<p className='signup-login-button'>Terms & Privacy Policy</p>
				</div>
				</div>
			</div>
		</>
	);
}

export default SignUp;
