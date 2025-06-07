import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/auth/authSlice';
import { auth } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './login.css';

function LogIn() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (e) => {
		e.preventDefault();

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				dispatch(setUser(user.uid));
				toast.success('Welcome back! 🎉');
				navigate('/home');
			})
			.catch((error) => {
				const errorCode = error.code;

				switch (errorCode) {
					case 'auth/user-not-found':
						toast.error('No user found with this email.');
						break;
					case 'auth/wrong-password':
					case 'auth/invalid-credential':
						toast.error('Incorrect password. Please try again.');
						break;
					case 'auth/invalid-email':
						toast.error('The email address is not valid.');
						break;
					case 'auth/missing-password':
						toast.error('Please enter your password.');
						break;
					case 'auth/too-many-requests':
						toast.error('Too many failed attempts. Try again later.');
						break;
					default:
						toast.error(`Error: ${error.message}`);
						break;
				}
			});
	};

	return (
		<div className='login-wrapper'>
			<div className='login-container'>
				<h1 className='login-title'>Welcome back!</h1>
				<p className='login-subtitle'>Please Log In to continue</p>

				<form onSubmit={handleLogin}>
					<label htmlFor='email' className='login-label'>
						Email
					</label>
					<input
						required
						onChange={(e) => setEmail(e.target.value)}
						type='email'
						id='email'
						className='login-input'
						placeholder='Example@quickbite.com'
						value={email}
					/>

					<label htmlFor='password' className='login-label'>
						Password
					</label>
					<input
						required
						onChange={(e) => setPassword(e.target.value)}
						type='password'
						id='password'
						className='login-input-password'
						placeholder='Your Password'
						value={password}
					/>

					<p className='login-forgot-password'>Forget password?</p>

					<button type='submit' className='login-button'>
						Log in
					</button>
				</form>

				<section className='login-signup'>
					<p className='login-account'>Don't have an account? </p>
					<p className='login-signup-button' onClick={() => navigate('/signup')}>
						Sign Up
					</p>
				</section>
			</div>
			<ToastContainer position='top-center' autoClose={3000} theme='light' />
		</div>
	);
}

export default LogIn;
