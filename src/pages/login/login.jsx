function LogIn() {
	return (
		<>
			<h1>Welcome back!</h1>
			<p>Please Log In to continue</p>
			<label htmlFor=''>Email</label>
			<input type='email' name='' id='' placeholder='Example@quickbite.com' />
			<label htmlFor=''>Password</label>
			<input type='password' name='' id='' placeholder='Your Password' />
			<p>Forget password?</p>
			<button>Log in</button>
			<p>Don’t have an account? </p>
			<button>Sign Up</button>
		</>
	);
}

export default LogIn;
