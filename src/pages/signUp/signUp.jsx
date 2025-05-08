// import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { setUser } from '../../redux/auth/authSlice';
import { auth } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './signup.css';

function SignUp() {
	const navigate = useNavigate();
	// const dispatch = useDispatch;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		document.body.classList.add('signup-body');

		return () => {
			document.body.classList.remove('signup-body');
		};
	}, []);

	const handleRegister = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user;
				navigate('/home');
				console.log(user);
			})
			.catch((error) => {
				window.alert('An error occured, try again!');
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(errorCode, errorMessage);
			});
	};

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
						<input required type='text' className='signup-input-name' name='name' id='name' placeholder='Jhon Doe' />
					</div>
					<div>
						<label className='signup-label' htmlFor='email'>
							Email
						</label>
						<ul></ul>
						<input
							required
							onChange={(e) => setEmail(e.target.value)}
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
							required
							onChange={(e) => setPassword(e.target.value)}
							type='password'
							className='signup-input-password'
							name='password'
							id='password'
							placeholder='Your Password'
						/>
					</div>
					<div>
						<p className='signup-forgot-password'>Forget password?</p>
						<button
							className='signup-button'
							onClick={() => {
								handleRegister();
							}}
						>
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
