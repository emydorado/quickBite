import { createSlice } from '@reduxjs/toolkit';

const doneRecipesSlice = createSlice({
	name: 'doneRecipes',
	initialState: {
		saved: JSON.parse(localStorage.getItem('doneRecipes')) || [],
	},
	reducers: {
		toggleDone: (state, action) => {
			const recipeId = action.payload;
			const index = state.saved.indexOf(recipeId);
			if (index === -1) {
				state.saved.push(recipeId);
			} else {
				state.saved.splice(index, 1);
			}
			localStorage.setItem('doneRecipes', JSON.stringify(state.saved));
		},
	},
});

export const { toggleDone } = doneRecipesSlice.actions;
export default doneRecipesSlice.reducer;
