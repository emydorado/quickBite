import NavMenu from '../../components/navMenu/navMenu';
import ChecklistCardDish from '../../components/checklistCardDish/checklistCardDish';
import { useEffect, useState } from 'react';
import { auth, db } from '../../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchRecipes } from '../../services/firebaseUtils';
import Loader from '../../components/loader/Loader';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/auth/authSlice';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, query, collection, getDocs, where, updateDoc } from 'firebase/firestore';
import './profile.css';

function Profile() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showUsernameModal, setShowUsernameModal] = useState(false);
	const [newUsername, setNewUsername] = useState('');
	const [showProfilePicModal, setShowProfilePicModal] = useState(false);
	const [photoURL, setPhotoURL] = useState('');
	const [username, setUsername] = useState('');
	const [doneRecipeIds, setDoneRecipeIds] = useState([]);
	const [loading, setLoading] = useState(true);
	const [uploading, setUploading] = useState(false);

	const [recipes, setRecipes] = useState([]);
	const uid = useSelector((state) => state.auth.uid);

	useEffect(() => {
		// función para fetchear recetas
		const loadRecipes = async () => {
			const recipes = await fetchRecipes();
			setRecipes(recipes);
		};
		loadRecipes();
	}, []);

	// función para darle un body diferente a profile
	useEffect(() => {
		document.body.classList.add('profile-body');

		return () => {
			document.body.classList.remove('profile-body');
		};
	}, []);

	// función para fetchear username

	useEffect(() => {
		const fetchUsername = async () => {
			const user = auth.currentUser;
			if (user) {
				const userRef = doc(db, 'users', user.uid);
				const userSnap = await getDoc(userRef);

				if (userSnap.exists()) {
					setUsername(userSnap.data().username);
				} else {
					console.log('No user data found');
				}
			}
		};

		fetchUsername();
	}, []);

	// funcion para fetchear recetas hechas

	useEffect(() => {
		const fetchMarkAsDoneRecipes = async () => {
			const q = query(collection(db, 'alreadyDoneRecipes'), where('uid', '==', uid));
			const querySnapshot = await getDocs(q);
			const ids = querySnapshot.docs.map((doc) => doc.data().recipeId);
			setDoneRecipeIds(ids);
			setLoading(false);
		};
		fetchMarkAsDoneRecipes();
	}, [uid]);

	const doneRecipes = recipes.filter((recipe) => doneRecipeIds.includes(String(recipe.id)));

	// función logout
	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				dispatch(removeUser());
				navigate('/login');
			})
			.catch((error) => {
				console.error('Logout error:', error);
			});
	};

	// función para actualizar foto de perfil
	const changeProfilePhoto = async (newPhotoURL) => {
		try {
			if (auth.currentUser) {
				await updateProfile(auth.currentUser, {
					photoURL: newPhotoURL,
				});
				console.log('Foto de perfil actualizada');
			}
		} catch (error) {
			console.error('Error al actualizar la foto de perfil:', error);
		}
	};

	// función para editar el username
	const updateUsername = async () => {
		try {
			const user = auth.currentUser;
			if (user) {
				const userRef = doc(db, 'users', user.uid);
				await updateDoc(userRef, {
					username: newUsername,
				});
				setUsername(newUsername);
				setNewUsername('');
				setShowUsernameModal(false);
				alert('Username updated successfully!');
			}
		} catch (error) {
			console.error('Error updating username:', error);
			alert('Error updating username');
		}
	};

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setUploading(true); // activar loader
		const formData = new FormData();

		formData.append('file', file);
		formData.append('upload_preset', 'user_profile_photos'); // tu preset en Cloudinary
		formData.append('public_id', `${uid}_${Date.now()}`);

		try {
			const response = await fetch(`https://api.cloudinary.com/v1_1/dkhpqx9na/image/upload`, {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();
			const imageUrl = data.secure_url;
			console.log('Nueva URL desde Cloudinary:', data.secure_url);

			await changeProfilePhoto(imageUrl); // actualiza en Firebase Auth

			// Actualizar en Firebase Auth
			await changeProfilePhoto(imageUrl);

			// Actualizar en Firestore
			const userRef = doc(db, 'users', uid);
			await updateDoc(userRef, { photoURL: imageUrl });

			// Forzar actualización del estado local
			setPhotoURL(imageUrl + `?${Date.now()}`); // Añadir timestamp para evitar cache

			setUploading(false); // desactivar loader
			setShowProfilePicModal(false);
		} catch (error) {
			console.error('Error al subir la imagen:', error);
			setUploading(false); // desactivar loader aunque haya error
		}
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setPhotoURL(user.photoURL ? `${user.photoURL}?${Date.now()}` : './src/assets/default-image-url.png');
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<>
			{showUsernameModal && (
				<div className='modal-overlay'>
					<div className='modal-content'>
						<h2 className='modal-title'>Change Username</h2>
						<p className='modal-body'>Enter your new username:</p>
						<input
							className='modal-input'
							type='text'
							placeholder='New username'
							value={newUsername}
							onChange={(e) => setNewUsername(e.target.value)}
						/>
						<button className='modal-button' onClick={updateUsername}>
							Submit
						</button>
						<button className='modal-button modal-button-secondary' onClick={() => setShowUsernameModal(false)}>
							Close
						</button>
					</div>
				</div>
			)}

			{showProfilePicModal && (
				<div className='modal-overlay'>
					<div className='modal-content'>
						<h2 className='modal-title'>Change Profile Photo</h2>
						<p className='modal-body'>Selecciona tu nueva foto de perfil:</p>

						{uploading ? <Loader /> : <input type='file' accept='image/*' onChange={handleImageUpload} />}

						{!uploading && (
							<button className='modal-button modal-button-secondary' onClick={() => setShowProfilePicModal(false)}>
								Close
							</button>
						)}
					</div>
				</div>
			)}

			{loading ? (
				<Loader />
			) : (
				<div className='profile-container'>
					<NavMenu />

					<section className='profile-content'>
						<div className='profile-picture-container'>
							<img
								src={photoURL || `${auth.currentUser?.photoURL}?${Date.now()}` || './src/assets/default-image-url.png'}
								alt='profile picture'
								className='profile-picture'
								key={photoURL} // Esto fuerza un remontaje cuando cambia la URL
							/>

							<div className='edit-icon-profile' onClick={() => setShowProfilePicModal(true)}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 24 24'
									style={{ fill: '#003324' }}
								>
									<path d='M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z'></path>
								</svg>
							</div>
						</div>
						<h1 className='username'>{username}</h1>
					</section>
					<section id='profile-body'>
						<div id='checklist-section'>
							<p className='recipes-done'>Recipes you’ve done</p>

							<div className='checklist-cards'>
								{doneRecipes.map((recipe) => (
									<ChecklistCardDish
										key={recipe.id}
										id={recipe.id}
										img={recipe.img}
										time={recipe.prep_time_minutes}
										title={recipe.recipe_name}
										description={recipe.description}
									/>
								))}
							</div>
						</div>

						<div id='options-section'>
							<div className='option-item' onClick={() => setShowUsernameModal(true)}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 24 24'
									style={{ fill: '#003324' }}
								>
									<path d='M4 21a1 1 0 0 0 .24 0l4-1a1 1 0 0 0 .47-.26L21 7.41a2 2 0 0 0 0-2.82L19.42 3a2 2 0 0 0-2.83 0L4.3 15.29a1.06 1.06 0 0 0-.27.47l-1 4A1 1 0 0 0 3.76 21 1 1 0 0 0 4 21zM18 4.41 19.59 6 18 7.59 16.42 6zM5.91 16.51 15 7.41 16.59 9l-9.1 9.1-2.11.52z'></path>
								</svg>
								Edit profile
							</div>
							<div className='option-item'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 24 24'
									style={{ fill: '#003324' }}
								>
									<path d='M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z'></path>
								</svg>
								Change password
							</div>
							<div className='option-item'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									height='20'
									width='20'
									viewBox='0 0 512 512'
									style={{ fill: '#003324' }}
								>
									<path d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z' />
								</svg>
								Frequent questions
							</div>
							<div className='option-item'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 24 24'
									style={{ fill: '#003324' }}
								>
									<path d='M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z'></path>
									<path d='m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z'></path>
								</svg>
								Settings
							</div>
							<div className='option-item' onClick={handleLogout}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='20'
									height='20'
									viewBox='0 0 24 24'
									style={{ fill: '#003324' }}
								>
									<path d='m13 16 5-4-5-4v3H4v2h9z'></path>
									<path d='M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z'></path>
								</svg>{' '}
								Log out
							</div>
						</div>
					</section>
				</div>
			)}
		</>
	);
}

export default Profile;
