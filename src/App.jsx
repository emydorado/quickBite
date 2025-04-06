import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Welcome from './pages/welcome/welcome';
import LogIn from './pages/login/login';
import Recipe from './pages/recipe/recipe';
import Search from './pages/search/search';
import Profile from './pages/profile/profile';
import Saved from './pages/saved/saved';
import SignUp from './pages/signUp/signUp';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Welcome />} />
				<Route path='/home' element={<Home />} />
				<Route path='/login' element={<LogIn />} />
				<Route path='/recipe' element={<Recipe />} />
				<Route path='/search' element={<Search />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/saved' element={<Saved />} />
				<Route path='/signup' element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
