import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Welcome from './pages/welcome/welcome';
import LogIn from './pages/login/login';
import Recipe from './pages/recipe/recipe';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Welcome />} />
				<Route path='/home' element={<Home />} />
				<Route path='/login' element={<LogIn />} />
				<Route path='/recipe' element={<Recipe />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
