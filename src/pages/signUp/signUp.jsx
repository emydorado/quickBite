function SignUp() {
	return (
		<>
			<h1>Sign Up</h1>
			<p>Create your new QuickBite account</p>
			<label htmlFor=''>Name</label>
			<input type='email' name='' id='' placeholder='Jhon Doe' />
			<label htmlFor=''>Email</label>
			<input type='email' name='' id='' placeholder='Example@quickbite.com' />
			<label htmlFor=''>Password</label>
			<input type='password' name='' id='' placeholder='Your Password' />
			<p>Forget password?</p>
			<button>Log in</button>
			<p>Already have an account? </p>
			<button>Log in</button>
			<p>By continue you agree to our</p>
			<button>Terms & Privacy Policy</button>
		</>
	);
}

export default SignUp;
