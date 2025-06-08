import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import 'react-toastify/dist/ReactToastify.css';
import './signup.css';

function SignUp() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		document.body.classList.add('signup-body');
		return () => {
			document.body.classList.remove('signup-body');
		};
	}, []);

	const getErrorMessage = (errorCode) => {
		switch (errorCode) {
			case 'auth/email-already-in-use':
				return 'The email address is already in use by another account.';
			case 'auth/invalid-email':
				return 'The email address is not valid.';
			case 'auth/operation-not-allowed':
				return 'Operation not allowed. Please contact support.';
			case 'auth/weak-password':
				return 'The password is too weak. It should be at least 6 characters.';
			default:
				return 'An unexpected error occurred. Please try again.';
		}
	};

	const handleRegister = async (e) => {
		e.preventDefault();

		if (!username.trim()) {
			toast.error('Please enter a valid username.');
			return;
		}
		if (!email.trim()) {
			toast.error('Please enter your email.');
			return;
		}
		if (!password || password.length < 6) {
			toast.error('Password must be at least 6 characters.');
			return;
		}

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			await setDoc(doc(db, 'users', user.uid), {
				username,
				email,
			});

			toast.success('User registered successfully!');
			navigate('/home');
		} catch (error) {
			toast.error(getErrorMessage(error.code));
			console.error(error);
		}
	};

	return (
		<div className='signup-wrapper'>
			<div className='signup-container'>
				<h1 className='signup-title'>Sign Up</h1>
				<p className='signup-subtitle'>Create your new QuickBite account</p>

				<form onSubmit={handleRegister} noValidate>
					<label htmlFor='username' className='signup-label'>
						Username
					</label>
					<input
						required
						type='text'
						id='username'
						className='signup-input-name'
						placeholder='Jhon Doe'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>

					<label htmlFor='email' className='signup-label'>
						Email
					</label>
					<input
						required
						type='email'
						id='email'
						className='signup-input-mail'
						placeholder='Example@quickbite.com'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<label htmlFor='password' className='signup-label'>
						Password
					</label>

					<div className='password-input-container'>
						<input
							required
							type={showPassword ? 'text' : 'password'}
							id='password'
							className='signup-input-password'
							placeholder='Your Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button type='button' onClick={() => setShowPassword(!showPassword)} className='toggle-password'>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</button>
					</div>

					<p className='signup-forgot-password'>Forget password?</p>

					<button type='submit' className='signup-button'>
						Sign Up
					</button>
				</form>

				<section className='signup-container-login'>
					<p className='signup-already-text'>
						Already have an account?{' '}
						<span className='signup-login-button' onClick={() => navigate('/login')}>
							Log in
						</span>
					</p>
				</section>

				<section className='signup-terms-container'>
					<p className='signup-terms-text'>
						By continuing you agree to our <span className='signup-terms-link'>Terms & Privacy Policy</span>
					</p>
				</section>
			</div>

			<ToastContainer position='top-right' autoClose={3000} theme='light' />
		</div>
	);
}

export default SignUp;
