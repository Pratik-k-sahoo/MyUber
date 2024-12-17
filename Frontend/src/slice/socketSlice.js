import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const initialState = {
	socket: null,
	connected: false,
};

const socketSlice = createSlice({
	name: "socket",
	initialState,
	reducers: {
		connect: (state) => {
			if (!state.socket) {
				state.socket = io("http://localhost:3000"); // Replace with your server URL
				state.connected = true;
				console.log("Connected to socket");
			}
		},
		disconnect: (state) => {
			if (state.socket) {
				state.socket.disconnect();
				state.socket = null;
				state.connected = false;
			}
		},
	},
});

export const { connect, disconnect } = socketSlice.actions;

export default socketSlice.reducer;
