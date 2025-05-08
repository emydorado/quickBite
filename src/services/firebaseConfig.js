import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAo5FYfUkSrEMPDrUi3IhEeV9S-IHLOnAA',
	authDomain: 'quickbite-3e9d9.firebaseapp.com',
	projectId: 'quickbite-3e9d9',
	storageBucket: 'quickbite-3e9d9.firebasestorage.app',
	messagingSenderId: '270051332291',
	appId: '1:270051332291:web:25815eb521d96521df1276',
	measurementId: 'G-0CJ7401PB2',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/auth.user
		const uid = user.uid;
		console.log(uid);
	} else {
		// User is signed out
		// ...
	}
});
