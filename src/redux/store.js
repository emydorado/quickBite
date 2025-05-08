import { configureStore } from '@reduxjs/toolkit';
import doneRecipesReducer from './doneRecipes/doneRecipesSlice';
import savedRecipesReducer from './savedRecipes/savedRecipesSlice';
import AuthReducer from './auth/authSlice';

const preloadedState = {
	savedRecipes: {
		saved: JSON.parse(localStorage.getItem('savedRecipes')) || [],
	},

	doneRecipes: {
		saved: JSON.parse(localStorage.getItem('doneRecipes')) || [],
	},
};

export const store = configureStore({
	reducer: {
		savedRecipes: savedRecipesReducer,
		doneRecipes: doneRecipesReducer,
		auth: AuthReducer,
	},

	preloadedState,
});
