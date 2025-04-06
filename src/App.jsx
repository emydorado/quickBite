import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Welcome from './pages/welcome/welcome';
import LogIn from './pages/login/login';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Welcome />} />
				<Route path='/home' element={<Home />} />
				<Route path='/login' element={<LogIn />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
