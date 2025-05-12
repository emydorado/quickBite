import { getDocs, collection, doc, deleteDoc, getDoc, setDoc, query, where } from 'firebase/firestore';
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

// función para guardar recetas

const COLLECTION_NAME = 'savedRecipes';

export const checkIfRecipeSaved = async (uid, recipeId) => {
	const docRef = doc(db, COLLECTION_NAME, `${uid}_${recipeId}`);
	const docSnap = await getDoc(docRef);
	return docSnap.exists();
};

export const saveRecipe = async (uid, recipeId) => {
	const docRef = doc(db, COLLECTION_NAME, `${uid}_${recipeId}`);
	await setDoc(docRef, {
		uid,
		recipeId,
		timestamp: Date.now(),
	});
};

export const removeSavedRecipe = async (uid, recipeId) => {
	const docRef = doc(db, COLLECTION_NAME, `${uid}_${recipeId}`);
	await deleteDoc(docRef);
};

export const getUserSavedRecipeIds = async (uid) => {
	const q = query(collection(db, COLLECTION_NAME), where('uid', '==', uid));
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => doc.data().recipeId);
};

// función para marcar como hechas las recetas

const COLLECTION_NAME_DONE = 'alreadyDoneRecipes';

export const checkIfRecipeIsDone = async (uid, recipeId) => {
	const docRef = doc(db, COLLECTION_NAME_DONE, `${uid}_${recipeId}`);
	const docSnap = await getDoc(docRef);
	return docSnap.exists();
};

export const markAsDoneRecipe = async (uid, recipeId) => {
	const docRef = doc(db, COLLECTION_NAME_DONE, `${uid}_${recipeId}`);
	await setDoc(docRef, {
		uid,
		recipeId,
		timestamp: Date.now(),
	});
};

export const removeMarkAsDoneRecipe = async (uid, recipeId) => {
	const docRef = doc(db, COLLECTION_NAME_DONE, `${uid}_${recipeId}`);
	await deleteDoc(docRef);
};

export const getUserMarkAsDoneRecipeIds = async (uid) => {
	const q = query(collection(db, COLLECTION_NAME_DONE), where('uid', '==', uid));
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => doc.data().recipeId);
};
