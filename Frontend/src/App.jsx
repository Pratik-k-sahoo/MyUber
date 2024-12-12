import { Route, Routes } from "react-router-dom";

import {
	Home,
	CaptainLogin,
	CaptainSignup,
	UserLogin,
	UserSignup,
	Start,
	UserLogout,
	UserProtectedWrapper,
	CaptainHome,
	CaptainProtectedWrapper,
	CaptainLogout,
  Riding,
} from "./pages";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Start />} />
				<Route path="/login" element={<UserLogin />} />
				<Route path="/signup" element={<UserSignup />} />
				<Route path="/captain-login" element={<CaptainLogin />} />
				<Route path="/captain-signup" element={<CaptainSignup />} />
				<Route
					path="/home"
					element={
						<UserProtectedWrapper>
							<Home />
						</UserProtectedWrapper>
					}
				/>
				<Route
					path="/user/logout"
					element={
						<UserProtectedWrapper>
							<UserLogout />
						</UserProtectedWrapper>
					}
				/>
				<Route
					path="/riding"
					element={
						<UserProtectedWrapper>
							<Riding />
						</UserProtectedWrapper>
					}
				/>
				<Route
					path="/captain/home"
					element={
						<CaptainProtectedWrapper>
							<CaptainHome />
						</CaptainProtectedWrapper>
					}
				/>
				<Route
					path="/captain/logout"
					element={
						<CaptainProtectedWrapper>
							<CaptainLogout />
						</CaptainProtectedWrapper>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
