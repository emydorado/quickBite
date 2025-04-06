import './login.css';

function LogIn() {
	return (
		<div className='login-container'>
			<h1 className='login-title'>Welcome back!</h1>
			<p className='login-subtitle'>Please Log In to continue</p>

			<label htmlFor='email' className='login-label'>
				Email
			</label>
			<ul></ul>
			<input type='email' name='email' id='email' placeholder='Example@quickbite.com' className='login-input' />
			<ul></ul>

			<label htmlFor='password' className='login-label'>
				Password
			</label>
			<ul></ul>
			<input type='password' name='password' id='password' placeholder='Your Password'  className='login-input-password' />
			<ul></ul>

			<p className='login-forgot-password'>Forget password?</p>

			<button className='login-button'>Log in</button>

			<section className='login-signup'>
				<p className='welcome-already'>Don't have an account? </p>
				<p className='welcome-login-button'>Sign Up</p>
			</section>
		</div>
	);
}

export default LogIn;
