import { createSlice } from '@reduxjs/toolkit';

const savedRecipesSlice = createSlice({
	name: 'savedRecipes',
	initialState: {
		saved: JSON.parse(localStorage.getItem('savedRecipes')) || [],
	},
	reducers: {
		toggleSave: (state, action) => {
			const recipeId = action.payload;
			const index = state.saved.indexOf(recipeId);
			if (index === -1) {
				state.saved.push(recipeId);
			} else {
				state.saved.splice(index, 1);
			}
			localStorage.setItem('savedRecipes', JSON.stringify(state.saved));
		},
	},
});

export const { toggleSave } = savedRecipesSlice.actions;
export default savedRecipesSlice.reducer;
