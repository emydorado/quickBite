import './navMenu.css';
import { useNavigate, useLocation } from 'react-router-dom';

const NavMenu = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<div id='navContainer'>
			<div id='logo'>
				<img
					src='https://res.cloudinary.com/dkhpqx9na/image/upload/v1749402955/logo_fdu3m1.png'
					alt='logo'
					onClick={() => navigate('/home')}
				/>
			</div>

			<div id='icons'>
				<div
					id='search'
					onClick={() => navigate('/search')}
					className={location.pathname === '/search' ? 'nav-item active' : 'nav-item'}
				>
					<svg xmlns='http://www.w3.org/2000/svg' width='5vw' height='5vw' viewBox='0 0 24 24' className='navIcon'>
						<path d='M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z'></path>
					</svg>
					<p className='categorie'>Search</p>
				</div>
				<div
					id='home'
					onClick={() => navigate('/home')}
					className={location.pathname === '/home' ? 'nav-item active' : 'nav-item'}
				>
					<svg xmlns='http://www.w3.org/2000/svg' width='5vw' height='5vw' viewBox='0 0 24 24' className='navIcon'>
						<path d='M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z'></path>
					</svg>
				</div>
				<div
					id='saved'
					onClick={() => navigate('/saved')}
					className={location.pathname === '/saved' ? 'nav-item active' : 'nav-item'}
				>
					<svg xmlns='http://www.w3.org/2000/svg' width='5vw' height='5vw' viewBox='0 0 24 24' className='navIcon'>
						<path d='M18 2H6c-1.103 0-2 .897-2 2v18l8-4.572L20 22V4c0-1.103-.897-2-2-2zm0 16.553-6-3.428-6 3.428V4h12v14.553z' />
					</svg>
					<p className='categorie'>Saved</p>
				</div>
				<div
					id='profile'
					onClick={() => navigate('/profile')}
					className={location.pathname === '/profile' ? 'nav-item active' : 'nav-item'}
				>
					<svg xmlns='http://www.w3.org/2000/svg' width='5vw' height='5vw' viewBox='0 0 24 24' className='navIcon'>
						<path d='M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z'></path>
					</svg>
					<p className='categorie'>Profile</p>
				</div>
			</div>
		</div>
	);
};

export default NavMenu;
