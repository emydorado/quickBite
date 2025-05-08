import { createSlice } from '@reduxjs/toolkit';

let saved = [];
try {
	saved = JSON.parse(localStorage.getItem('doneRecipes')) || [];
} catch {
	saved = [];
}

const doneRecipesSlice = createSlice({
	name: 'doneRecipes',
	initialState: {
		done: saved,
	},
	reducers: {
		toggleDone: (state, action) => {
			console.log('Payload recibido:', action.payload);
			console.log('Estado inicial (done):', state.done);
			if (!state.done) state.done = [];

			const recipeId = action.payload;
			const index = state.done.indexOf(recipeId);
			if (index === -1) {
				state.done.push(recipeId);
			} else {
				state.done.splice(index, 1);
			}
			console.log('Estado actualizado (done):', state.done);
			localStorage.setItem('doneRecipes', JSON.stringify(state.done));
		},
	},
});

export const { toggleDone } = doneRecipesSlice.actions;
export default doneRecipesSlice.reducer;
