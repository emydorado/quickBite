import { configureStore } from '@reduxjs/toolkit';
import savedRecipesReducer from './savedRecipes/savedRecipesSlice';

export const store = configureStore({
	reducer: {
		savedRecipes: savedRecipesReducer,
	},
});
