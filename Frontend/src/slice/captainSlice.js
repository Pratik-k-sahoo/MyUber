import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	captain: null,
};

export const captainSlice = createSlice({
	name: "captain",
	initialState,
	reducers: {
		login: (state, action) => {
			state.captain = action.payload;
		},
		logout: (state) => {
			state.captain = null;
		},
	},
});

export const { login, logout } = captainSlice.actions;

export default captainSlice.reducer;