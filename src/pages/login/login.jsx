import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/auth/authSlice';
import { auth } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

import './login.css';

function LogIn() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				dispatch(setUser(user.uid));
				navigate('/home');
			})
			.catch((error) => {
				window.alert('An error occured, try again!');
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};

	return (
		<div className='login-wrapper'>
			<div className='login-container'>
				<h1 className='login-title'>Welcome back!</h1>
				<p className='login-subtitle'>Please Log In to continue</p>

				<label htmlFor='email' className='login-label'>
					Email
				</label>
				<ul></ul>
				<input
					required
					onChange={(e) => setEmail(e.target.value)}
					type='email'
					id='email'
					className='login-input'
					placeholder='Example@quickbite.com'
				/>
				<ul></ul>

				<label htmlFor='password' className='login-label'>
					Password
				</label>
				<ul></ul>
				<input
					required
					onChange={(e) => setPassword(e.target.value)}
					type='password'
					id='password'
					className='login-input-password'
					placeholder='Your Password'
				/>
				<ul></ul>

				<p className='login-forgot-password'>Forget password?</p>

				<button
					className='login-button'
					onClick={() => {
						handleLogin();
					}}
				>
					Log in
				</button>

				<section className='login-signup'>
					<p className='login-account'>Don't have an account? </p>
					<p className='login-signup-button' onClick={() => navigate('/signup')}>
						Sign Up
					</p>
				</section>
			</div>
		</div>
	);
}

export default LogIn;
