import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	uid: null,
};

const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.uid = action.payload.uid;
		},
		removeUser: (state) => {
			state.uid = null;
		},
	},
});

export const { setUser, removeUser } = AuthSlice.actions;
export default AuthSlice.reducer;
