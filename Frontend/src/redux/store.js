import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "../slice/userSlice";
import captainSlice from "../slice/captainSlice";
import socketSlice from "../slice/socketSlice";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
  blacklist: ['socket']
};

const rootReducer = combineReducers({
	user: userSlice,
	captain: captainSlice,
  socket: socketSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				ignoredPaths: ["socket"],
			},
		}),
});

export default store;
