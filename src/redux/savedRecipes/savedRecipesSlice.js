import { createSlice } from '@reduxjs/toolkit';

const savedRecipesSlice = createSlice({
	name: 'savedRecipes',
	initialState: {
		saved: [],
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
		},
	},
});

export const { toggleSave } = savedRecipesSlice.actions;
export default savedRecipesSlice.reducer;
