import { useNavigate } from 'react-router-dom';
import './signup.css';

function SignUp() {
	const navigate = useNavigate();

	return (
		<>
			<div className='signup-wrapper'>
				<h1 className='signup-title'>Sign Up</h1>
				<p className='signup-subtitle'>Create your new QuickBite account</p>
				<div>
					<label className='signup-label ' htmlFor=''>
						Name
					</label>
					<ul></ul>
					<input type='email' className='signup-input' name='' id='' placeholder='Jhon Doe' />
				</div>
				<div>
					<label className='signup-label ' htmlFor=''>
						Email
					</label>
					<ul></ul>
					<input type='email' className='signup-input' name='' id='' placeholder='Example@quickbite.com' />
				</div>
				<div>
					<label className='signup-label ' htmlFor=''>
						Password
					</label>
					<ul></ul>
					<input type='password' className='signup-input' name='' id='' placeholder='Your Password' />
				</div>
				<div>
					<p className='signup-forgot-password'>Forget password?</p>
					<button className='signup-button' onClick={() => navigate('/home')}>
						Sign in
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
		</>
	);
}

export default SignUp;
