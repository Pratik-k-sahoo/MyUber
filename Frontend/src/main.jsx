import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import { Provider, useDispatch } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "remixicon/fonts/remixicon.css";
import { connect } from "./slice/socketSlice.js";

const persistor = persistStore(store);

const AppWrapper = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(connect());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
};

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<AppWrapper />
		</PersistGate>
	</Provider>
);
