import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	uid: null,
	isLoading: true,
};

const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.uid = action.payload;
			state.isLoading = false;
		},
		removeUser: (state) => {
			state.uid = null;
			state.isLoading = false;
		},
	},
});

export const { setUser, removeUser } = AuthSlice.actions;
export default AuthSlice.reducer;
