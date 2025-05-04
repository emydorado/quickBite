import { configureStore } from '@reduxjs/toolkit';
import savedRecipesReducer from './savedRecipes/savedRecipesSlice';

const preloadedState = {
	savedRecipes: {
		saved: JSON.parse(localStorage.getItem('savedRecipes')) || [],
	},
};

export const store = configureStore({
	reducer: {
		savedRecipes: savedRecipesReducer,
	},

	preloadedState,
});
