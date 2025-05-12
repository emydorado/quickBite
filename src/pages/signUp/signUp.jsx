import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConfig';
import { db } from '../../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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

	const handleRegister = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;

				await setDoc(doc(db, 'users', user.uid), {
					username: username,
					email: email,
				});

				navigate('/home');
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(errorCode, errorMessage);
				window.alert(errorMessage);
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
							Username
						</label>
						<ul></ul>
						<input
							required
							onChange={(e) => setUsername(e.target.value)}
							type='text'
							className='signup-input-name'
							name='name'
							id='name'
							placeholder='Jhon Doe'
						/>
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
