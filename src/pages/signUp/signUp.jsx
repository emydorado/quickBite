import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConfig';
import { db } from '../../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';

function SignUp() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

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

	// Validación simple para evitar llamadas sin datos o inválidos
	const handleRegister = () => {
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

		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;

				await setDoc(doc(db, 'users', user.uid), {
					username: username,
					email: email,
				});

				toast.success('User registered successfully!');
				navigate('/home');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = getErrorMessage(errorCode);
				console.error(errorCode, error.message);
				toast.error(errorMessage);
			});
	};

	return (
		<>
			<div className='signup-wrapper'>
				<div className='signup-container'>
					<h1 className='signup-title'>Sign Up</h1>
					<p className='signup-subtitle'>Create your new QuickBite account</p>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleRegister();
						}}
						noValidate
					>
						<div>
							<label className='signup-label' htmlFor='name'>
								Username
							</label>
							<input
								required
								type='text'
								className='signup-input-name'
								name='name'
								id='name'
								placeholder='Jhon Doe'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div>
							<label className='signup-label' htmlFor='email'>
								Email
							</label>
							<input
								required
								type='email'
								className='signup-input-mail'
								name='email'
								id='email'
								placeholder='Example@quickbite.com'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label className='signup-label' htmlFor='password'>
								Password
							</label>
							<input
								required
								type='password'
								className='signup-input-password'
								name='password'
								id='password'
								placeholder='Your Password'
								minLength={6}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div>
							<p className='signup-forgot-password'>Forget password?</p>
							<button type='submit' className='signup-button'>
								Sign Up
							</button>
						</div>
					</form>

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
			<ToastContainer />
		</>
	);
}

export default SignUp;
