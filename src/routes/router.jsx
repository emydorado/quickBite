import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';
import Home from '../pages/home/home';
import LogIn from '../pages/login/login';
import Profile from '../pages/profile/profile';
import Recipe from '../pages/recipe/recipe';
import Saved from '../pages/saved/saved';
import Search from '../pages/search/search';
import SignUp from '../pages/signUp/signUp';
import Welcome from '../pages/welcome/welcome';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../services/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, removeUser } from '../redux/auth/authSlice';

const Router = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(setUser(user.uid));
			} else {
				dispatch(removeUser());
			}
		});

		//Desmontar al terminarse de ejecutar
		return () => unsubscribe();
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Welcome />} />
				<Route path='/login' element={<LogIn />} />
				<Route path='/signup' element={<SignUp />} />
				<Route
					path='/home'
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/recipe/:id'
					element={
						<ProtectedRoute>
							<Recipe />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/search'
					element={
						<ProtectedRoute>
							<Search />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/profile'
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/saved'
					element={
						<ProtectedRoute>
							<Saved />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
