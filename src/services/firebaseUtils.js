import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';

// fetch para traer ingredientes

export const fetchIngredients = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, 'INGREDIENTS'));
		return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		console.error('Error fetching ingredients:', error);
		return [];
	}
};

// fetch para traer categorías

export const fetchCategories = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, 'CATEGORIES'));
		return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		console.error('Error fetching categories:', error);
		return [];
	}
};

// fetch para traer recetas

export const fetchRecipes = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, 'RECIPES'));
		return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		console.error('Error fetching recipes:', error);
		return [];
	}
};
